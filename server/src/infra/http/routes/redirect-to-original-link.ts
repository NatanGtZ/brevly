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
            200: z.object({
              message: z.string(),
            }),
          },
      },
    },
    async (request, reply) => {

      let result = await sendToOriginalLink(request.params.shortLink);
      
      if(result instanceof AppError){
        return reply
          .status(result.statusCode)
          .send({ message: result.message});
      }

      return reply.redirect(result.originalLink);
    }
  )
}