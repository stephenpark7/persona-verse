import jwt, { type Secret } from 'jsonwebtoken';
import type { IncomingHttpHeaders } from 'http';
import type { NextFunction, Response } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { AuthenticatedRequest, JwtPayload } from '@shared/types';
import { sendUnauthorizedResponse } from '@utils';

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (
    req.url.startsWith('/registerUser') ||
    req.url.startsWith('/loginUser') ||
    req.url.startsWith('/logoutUser') ||
    req.url.startsWith('/refreshJwt')
  ) {
    return next();
  }

  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['authorization']?.split(' ')[1];
  const secret = process.env.JWT_SECRET as Secret;

  if (!token) {
    return sendUnauthorizedResponse(res, 'No token provided.', 401);
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return sendUnauthorizedResponse(
          res,
          'Session expired. Please login again.',
          401,
        );
      }
      return sendUnauthorizedResponse(res, err.message, 401);
    }

    const decodedToken = decoded as JwtPayload;
    if (decodedToken.userId == null) {
      return sendUnauthorizedResponse(
        res,
        'Token does not have a userId.',
        401,
      );
    }

    req.userId = decodedToken.userId;
    return next();
  });
};

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  await new Promise<void>((resolve, reject) => {
    auth(req as unknown as AuthenticatedRequest, res, (err) => {
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
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
