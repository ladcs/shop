import { z } from 'zod';

const schemaToUpdate = z.object({
  code: z.number(),
  newPrice: z.number().refine((val) => val % 0.01 === 0, {
    message: 'The price must be a decimal number with 2 decimal places.',
  }),
});

export default schemaToUpdate;