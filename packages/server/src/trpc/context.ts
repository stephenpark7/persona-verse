import winston from 'winston';
import { timingSafeEqual } from 'crypto';
import jwt, { type Secret } from 'jsonwebtoken';
import type { IncomingHttpHeaders } from 'http';
import type { NextFunction, Response } from 'express';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { AuthenticatedRequest, JwtPayload } from '@shared/types';
import { sendUnauthorizedResponse } from '@utils';
import { User } from '@db/models';

const isAuthHeaderRequired = (url: string) => {
  const noAuthHeaderUrls = ['/registerUser', '/loginUser', '/refreshJwt'];
  return !noAuthHeaderUrls.some((u) => url.startsWith(u));
};

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (!isAuthHeaderRequired(req.url)) {
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

      if (err.message == null) {
        return sendUnauthorizedResponse(res, err.message, 401);
      }

      return sendUnauthorizedResponse(res, 'Unexpected error.', 401);
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

    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return sendUnauthorizedResponse(res, 'User not found.', 401);
      }

      // Timing-safe comparison for user ID
      const userIdBuffer = Buffer.from(req.userId.toString());
      const dbUserIdBuffer = Buffer.from(user.getDataValue('id').toString());

      if (!timingSafeEqual(userIdBuffer, dbUserIdBuffer)) {
        return sendUnauthorizedResponse(res, 'User not found.', 401);
      }
    } catch (error) {
      winston.error(`Database error:, ${error}`);
      return sendUnauthorizedResponse(res, 'Internal server error.', 500);
    }

    return next();
  });
};

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  try {
    await new Promise<void>((resolve, reject) => {
      auth(req as unknown as AuthenticatedRequest, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    winston.error(err);
  }

  return {
    req,
    res,
    session: req.session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
