import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Model, ModelStatic } from 'sequelize';

export interface AuthenticatedRequest extends Request {
  token?: string;
  userId?: number;
};

export interface RequestBody {
  message: string;
};

export interface JWTPayload extends JwtPayload {
  userId: number;
  username: string;
  expiresAt?: number;
  jti?: string;
};

export interface ModelDefinitions {
  User: ModelStatic<Model>;
  Tweet: ModelStatic<Model>;
  RevokedToken: ModelStatic<Model>;
  RefreshToken: ModelStatic<Model>;
  UserProfile: ModelStatic<Model>;
}

export * from './user.controller.interface';
