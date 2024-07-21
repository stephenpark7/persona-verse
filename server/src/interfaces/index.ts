import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Model, ModelStatic } from 'sequelize';

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

export interface Models {
  User: ModelStatic<Model>;
  Tweet: ModelStatic<Model>;
  RevokedToken: ModelStatic<Model>;
  RefreshToken: ModelStatic<Model>;
}
