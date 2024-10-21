import { z } from 'zod';
import type { Algorithm } from 'jsonwebtoken';

export const jwtPayload = z.object({
  userId: z.number(),
  username: z.string(),
  jti: z.string().optional(),
  // expiresAt: z.number().optional(),
});

export const jwt = z.object({
  token: z.string(),
  payload: jwtPayload,
  // expiresAt: z.number(),
});

export const jwtOptions = z.object({
  algorithm: z.custom<Algorithm>(),
  expiresIn: z.number().optional(),
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

export enum TokenType {
  AccessToken = 'AccessToken',
  RefreshToken = 'RefreshToken',
}
