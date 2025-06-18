import { getLinks } from "@/app/functions/get-links";
import { create } from "domain";
import { or } from "drizzle-orm";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { access } from "fs";
import z from "zod"


export const getMyLinks: FastifyPluginAsyncZod = async server => {
  server.get(
    '/myLinks',
    {
      schema: {
        summary: 'Get Links',
        tags: ['links'],
        response: {
            200: z.object({
              links: z.array(
                z.object({
                  id: z.string(),
                  originalLink: z.string(),
                  shortLink: z.string(),
                  accesses: z.string(),
                  createdAt: z.date(),
                })
              )
            }),
        },
      },
    },
    async (request, reply) => {

      var links = await getLinks();

      return reply.status(200).send({ links });
    }
  )
}