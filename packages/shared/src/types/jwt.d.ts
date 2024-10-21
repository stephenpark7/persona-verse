import type { InferType } from 'zod';
import {
  jwt,
  jwtPayload,
  accessToken,
  refreshToken,
  jwtToken,
  jwtOptions,
  refreshTokenPayload,
} from '../schemas/jwt';

export type Jwt = InferType<typeof jwt>;

export type JwtPayload = InferType<typeof jwtPayload>;

export type AccessToken = InferType<typeof accessToken>;

export type RefreshToken = InferType<typeof refreshToken>;

export type JwtToken = InferType<typeof jwtToken>;

export type JwtOptions = InferType<typeof jwtOptions>;

export type RefreshTokenPayload = InferType<typeof refreshTokenPayload>;
