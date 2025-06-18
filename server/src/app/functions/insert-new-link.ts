import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas';
import z from "zod";

const insertNewLinkInput = z.object({
  original_url: z.string().url(),
  short_url: z.string().url(),
  accesses: z.number().default(0),
})

type insertNewLinkInput = z.infer<typeof insertNewLinkInput>;


export async function insertNewLink(input : insertNewLinkInput) {
  const { original_url, short_url, accesses } = insertNewLinkInput.parse(input);

  return await db.insert(schema.links).values({
    originalLink: original_url,
    shortLink: short_url,
    accesses: accesses.toString(),
  })
}