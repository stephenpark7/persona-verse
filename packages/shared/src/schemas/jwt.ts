import { z } from 'zod';
import type { Algorithm } from 'jsonwebtoken';

export const jwtPayload = z.object({
  userId: z.number(),
  username: z.string(),
  jti: z.string().optional(),
  expiresAt: z.string().optional(),
});

export const accessTokenPayload = jwtPayload
  .extend({
    expiresAt: z.string(),
  })
  .pick({
    userId: true,
    username: true,
  });

export const refreshTokenPayload = jwtPayload
  .extend({
    jti: z.string(),
    expiresAt: z.string(),
  })
  .pick({
    userId: true,
    username: true,
    jti: true,
  });

export const decodedJwt = z.object({
  jti: z.string().optional(),
  userId: z.number(),
  username: z.string(),
  expiresAt: z.string(),
});

export const jwt = z.object({
  token: z.string(),
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
