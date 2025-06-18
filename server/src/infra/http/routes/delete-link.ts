import { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { deleteLink } from "@/app/functions/delete-link";
import z from "zod";

const deleteLinkParams = z.object({
  id: z.string().uuid(),
})

export const deleteLinks: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    '/delete-link/:id',
    {
      schema: {
        summary: 'Delete a Link',
        tags: ['links'],
        params: deleteLinkParams,
        response: {
            200: z.object({
              message: z.string(),
            }),
          },
      },
    },
    async (request, reply) => {

      var linkId = request.params.id;

      var result = await deleteLink(linkId);

      return reply.status(200).send({
        message: 'Link deleted successfully',
      });
    }
  )
}