import { NextFunction, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import type { AuthenticatedRequest, JwtPayload } from '@shared/types';
import { sendUnauthorizedResponse } from '@utils';

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['authorization']?.split(' ')[1];
  const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;

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
    if (decodedToken.userId === undefined || decodedToken.userId === null) {
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
