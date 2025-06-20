
import { ExportToCSV } from '@/app/functions/export-to-csv'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportToCSV: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/export',
    {
      schema: {
        summary: 'Export Links',
        tags: ['links'],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {

      const { reportUrl } = await ExportToCSV()

      return reply.status(200).send({ reportUrl })
    }
  )
}
