import type { InferType } from '.';
import type { jwtPayload, accessToken, refreshToken } from '../src/schemas';

export type Jwt = InferType<typeof jwt>;

export type JwtPayload = InferType<typeof jwtPayload>;

export type AccessToken = InferType<typeof accessToken>;

export type RefreshToken = InferType<typeof refreshToken>;

export type JwtToken = InferType<typeof jwtToken>;
