import winston from 'winston';
import { timingSafeEqual } from 'crypto';
import jwt, { type Secret } from 'jsonwebtoken';
import type { NextFunction, Response } from 'express';
import type {
  AuthenticatedRequest,
  CreateContextParams,
  JwtPayload,
  RefreshTokenPayload,
} from '@shared/types';
import { sendUnauthorizedResponse } from '@utils';
import { User } from '@db/models';
import type { Request } from 'express';
import type { IncomingHttpHeaders } from 'http';
import { Jwt, RefreshToken } from '@models';
import { refreshTokenPayload } from '@shared/schemas';

const isAuthHeaderRequired = (url: string) => {
  const noAuthHeaderUrls = ['/registerUser', '/loginUser', '/refreshJwt'];
  return !noAuthHeaderUrls.some((u) => url.startsWith(u));
};

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (!isAuthHeaderRequired(req.url)) {
    return next();
  }

  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['authorization']?.split(' ')[1];

  if (!token) {
    return sendUnauthorizedResponse(res, 'No token provided.', 401);
  }

  const decoded = (await Jwt.decode(token, true)) as RefreshTokenPayload;

  req.userId = decoded.userId as number;

  try {
    const user = await User.findById(req.userId);

    const userIdBuffer = Buffer.from(req.userId.toString());
    const dbUserIdBuffer = Buffer.from(user.getId().toString());

    if (!timingSafeEqual(userIdBuffer, dbUserIdBuffer)) {
      return sendUnauthorizedResponse(res, 'User not found.', 401);
    }
  } catch (error) {
    winston.error(`Database error:, ${error}`);
    return sendUnauthorizedResponse(res, 'Internal server error.', 500);
  }

  return next();
};

export const createContext = async ({ req, res }: CreateContextParams) => {
  try {
    await new Promise<void>((resolve, reject) => {
      auth(req, res, (err) => {
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
