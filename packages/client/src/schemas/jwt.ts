import { z } from 'zod';

export const JwtSchema = z.object({
  token: z.string(),
  expiresAt: z.number(),
  payload: z.object({
    userId: z.number(),
    username: z.string(),
  }),
});

export type JwtData = z.infer<typeof JwtSchema>;
