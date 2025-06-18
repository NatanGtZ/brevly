import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const redirectToOriginalLink: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/:shortLink',
    {
      schema: {
        summary: 'Redirect to Original Link',
        tags: ['links'],
        params: z.object({
          shortLink: z.string().min(1),
        }),
        response: {
            200: z.object({
              message: z.string(),
            }),
          },
      },
    },
    async (request, reply) => {
       const result = await db.query.links.findFirst({
          where: (link, { eq }) => eq(schema.links.shortLink, 'http://localhost:3333/' + request.params.shortLink),
        });

    if (!result) {
      return reply.code(404).send({ message: 'Link não encontrado' });
    }

    if (result.originalLink === null) {
      return reply.code(400).send({ message: 'Link inválido' });
    }
    return reply.redirect(result.originalLink);
    }
  )
}