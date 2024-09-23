import * as trpcExpress from '@trpc/server/adapters/express';
import { NextFunction, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JWTPayload } from '@interfaces';
import { sendUnauthorizedResponse } from '@utils';
import winston from 'winston';

export const auth = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction,
): Promise<Response | void> => {

  winston.log('info', req.url);
  if (req.url.startsWith('/loginUser')) {
    return next();
  }

  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['authorization']?.split(' ')[1];
  const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;

  // winston.log('info', headers);

  if (!token) {
    return sendUnauthorizedResponse(res, 'No token provided.', 401);
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return sendUnauthorizedResponse(res, 'Session expired. Please login again.', 401);
      }
      return sendUnauthorizedResponse(res, err.message, 401);
    }

    const decodedToken = decoded as JWTPayload;
    if (decodedToken.userId === undefined || decodedToken.userId === null) {
      return sendUnauthorizedResponse(res, 'Token does not have a userId.', 401);
    }

    req.userId = decodedToken.userId;
    return next();
  });
};

// Create context with authentication
export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  await new Promise<void>((resolve, reject) => {
    auth(req as AuthenticatedRequest, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return {
    req,
    res,
    session: req.session,
    userId: (req as AuthenticatedRequest).userId,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
