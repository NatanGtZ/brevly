import { AppError } from "@/app/errors/AppError";
import { sendToOriginalLink } from "@/app/functions/send-to-original-link";
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
          404: z.object({
            message: z.string(),
            status: z.number(),
          }),
          200: z.object({
            originalLink: z.string(),
            status: z.number(),
          }),
          },
      },
    },
    async (request, reply) => {

      let result = await sendToOriginalLink(request.params.shortLink);
      
      if(result instanceof AppError){
        return reply
          .status(404)
          .send({ message: result.message, status: 404 });
      }

      return reply.status(200).send({ originalLink: result.originalLink, status: 200 });
    }
  )
}