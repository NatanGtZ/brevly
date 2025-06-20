import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { stringify } from 'csv-stringify'

type ExportLinksOutput = {
  reportUrl: string
}

export async function ExportToCSV(): Promise<ExportLinksOutput>{
  
  const { sql, params } = db
    .select({
      id: schema.links.id,
      originalLink: schema.links.originalLink,
      shortLink: schema.links.shortLink,
      accesses: schema.links.accesses,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(1)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'Id' },
      { key: 'original_link', header: 'Original Link' },
      { key: 'short_link', header: 'Short Link' },
      { key: 'accesses', header: 'Accesses' },
      { key: 'created_at', header: 'Created At' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }
        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )
    
    const uploadToStorage = uploadFileToStorage({
      contentType: 'text/csv',
      folder: 'downloads',
      fileName: `${new Date().toISOString()}-uploads.csv`,
      contentStream: uploadToStorageStream,
    })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return { reportUrl: url};
}