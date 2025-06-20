import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { AppError } from "../errors/AppError";
import z from "zod";

const link = z.object({
  id: z.string().uuid(),
  originalLink: z.string().url(),
  shortLink: z.string(),
  accesses: z.number().default(0),
})

type LinkType = z.infer<typeof link>;


export async function sendToOriginalLink(shortLink: string): Promise<LinkType| AppError>{

   const result = await db.query.links.findFirst({
          where: (link, { eq }) => eq(schema.links.shortLink, '/' + shortLink),
        });

    if (!result) {
      return new AppError("Link não Encontrado", 404);
    }

    if (!result.originalLink) {
      return new AppError("Link Inválido", 400);
    }

    await db.update(schema.links)
      .set({
        accesses: result.accesses + 1,
      })
      .where(eq(schema.links.shortLink, result.shortLink));
    
    return result;
}