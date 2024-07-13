import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  token?: string;
};

export interface CreateRequestBody {
  message?: string;
};

export interface TokenPayload {
  id: number;
  username: string;
  accessToken: string;
  jti: string;
};

export interface LoginParams {
  username: string;
  password: string;
};
