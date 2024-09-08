import { z } from 'zod';

export const jwtSchema = z.object({
  token: z.string(),
  expiresAt: z.number(),
  payload: z.object({
    userId: z.number(),
    username: z.string(),
  }),
});

export type Jwt = z.infer<typeof jwtSchema>;
