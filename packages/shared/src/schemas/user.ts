import { z } from 'zod';

export const user = z.object({
  id: z.number().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof user>;
