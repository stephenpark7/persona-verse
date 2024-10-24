import { z } from 'zod';

export const jwtSchema = z.object({
  token: z.string(),
  payload: z.object({
    userId: z.number(),
    username: z.string(),
    expiresAt: z.string(),
  }),
});

export type Jwt = z.infer<typeof jwtSchema>;
