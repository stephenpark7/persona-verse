import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { User, Tweet, RevokedToken, RefreshToken } from '../db';

export interface AuthenticatedRequest extends Request {
  token?: string;
  userId?: number;
};

export interface CreateRequestBody {
  message: string;
};

export interface LoginParams {
  username: string;
  password: string;
};

export interface JWTPayload extends JwtPayload {
  userId: number;
  username: string;
  expiresAt?: number;
  jti?: string;
};

export interface Sequelize {
  User: typeof User;
  Tweet: typeof Tweet;
  RevokedToken: typeof RevokedToken;
  RefreshToken: typeof RefreshToken;
};
