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

export const accessToken = z.object({
  token: z.string(),
  expiresAt: z.number(),
  payload: jwtPayload,
});

export const refreshToken = z.object({
  token: z.string(),
  expiresAt: z.number(),
  payload: jwtPayload,
});

export const jwtToken = z.union([accessToken, refreshToken]);

export type Jwt = z.infer<typeof jwt>;
export type JwtPayload = z.infer<typeof jwtPayload>;
export type AccessToken = z.infer<typeof accessToken>;
export type RefreshToken = z.infer<typeof refreshToken>;
export type JwtToken = z.infer<typeof jwtToken>;
