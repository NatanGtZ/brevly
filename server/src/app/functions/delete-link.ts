import { db } from '@/infra/db'
import { eq } from 'drizzle-orm';
import { schema } from '@/infra/db/schemas';


export async function deleteLink(id: string) {

  let linkId = await db.select()
    .from(schema.links)
    .where(eq(schema.links.id, id));

  if(linkId != null) {
    await db.delete(schema.links)
      .where(eq(schema.links.id, id));
    
    return {
      message: 'Link deleted successfully',
    };
  }
    

}