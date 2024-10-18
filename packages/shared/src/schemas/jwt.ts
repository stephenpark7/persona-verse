import { z } from 'zod';

export const jwtPayload = z.object({
  userId: z.number(),
  username: z.string(),
  // expiresAt: z.number().optional(),
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

export const jwt = z.object({
  token: z.string(),
  // expiresAt: z.number(),
  payload: jwtPayload,
});

export const jwtToken = z.union([accessToken, refreshToken]);
