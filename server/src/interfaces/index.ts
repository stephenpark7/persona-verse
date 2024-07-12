import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: string;
};

export interface CreateRequestBody {
  message?: string;
};
