import { z } from 'zod';

export const tweet = z.object({
  id: z.number(),
  message: z.string(),
  likes: z.number(),
  createdAt: z.string(),
});
