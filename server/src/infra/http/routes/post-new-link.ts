import { insertNewLink } from "@/app/functions/insert-new-link";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '@/infra/db'
import z from "zod";

export const postNewLink: FastifyPluginAsyncZod = async server => {
    server.post(
      '/new-link',
      {
          schema: {
          summary: 'Post a Link',
          tags: ['links'],
          body: z.object({
            original_url: z.string().url(),
            short_url: z.string(),
            accesses: z.number().default(0),
          }),
          response: {
              200: z.object({
                message: z.string(),
              }),
            },
          },
      },
      async (request,  reply) => {
        var getLinkIfExists = await db.query.links.findFirst({
            where: (links, { eq }) => eq(links.shortLink,   request.body.short_url),
          })
        
          if(getLinkIfExists) {
            return reply.send({
              message: 'Link already exists',
            });
          }
        

        const result = await insertNewLink({
          original_url: request.body.original_url,
          short_url: request.body.short_url,
          accesses: request.body.accesses,
        })
        
        return reply.status(201).send({
          message: 'Link created successfully',
        });
      }
    )
}