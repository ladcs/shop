import { z } from 'zod';

const schemaToUpdate = z.object({
  code: z.number(),
  newPrice: z.number(),
});

export default schemaToUpdate;