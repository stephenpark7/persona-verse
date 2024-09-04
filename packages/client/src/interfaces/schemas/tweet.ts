import { z } from 'zod';

export const TweetSchema = z.object({
  id: z.number(),
  message: z.string(),
  createdAt: z.string(),
  User: z.object({
    username: z.string(),
  }),
});
