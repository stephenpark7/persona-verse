import { z } from 'zod';

export const jwt = z.object({
  token: z.string(),
  expiresAt: z.number(),
  payload: jwtPayload,
});

export const jwtPayload = z.object({
  userId: z.number(),
  username: z.string(),
  expiresAt: z.number().optional(),
  jti: z.string().optional(),
});

export type Jwt = z.infer<typeof jwt>;
export type JwtPayload = z.infer<typeof jwtPayload>;
