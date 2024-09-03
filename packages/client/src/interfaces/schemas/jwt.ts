import { z } from 'zod';

export const JWTSchema = z.object({
  token: z.string(),
  expiresAt: z.number(),
  payload: z.object({
    userId: z.number(),
    username: z.string(),
  }),
});
