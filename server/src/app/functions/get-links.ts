import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { desc } from 'drizzle-orm';

export async function getLinks() {
 return await db.select().from(schema.links)
  .orderBy(desc(schema.links.id));
}