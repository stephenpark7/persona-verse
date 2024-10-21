import { z } from 'zod';
import type { Algorithm } from 'jsonwebtoken';

export const jwtPayload = z.object({
  userId: z.number(),
  username: z.string(),
  // expiresAt: z.number().optional(),
  jti: z.string().optional(),
});

export const jwt = z.object({
  token: z.string(),
  // expiresAt: z.number(),
  payload: jwtPayload,
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
