import { timingSafeEqual } from 'crypto';

import type { NextFunction, Request, Response } from 'express';

import type { CreateContextParams } from '@shared/types';

import { logger, sendUnauthorizedResponse } from '@utils';

import { User } from '@db/models';

import { Jwt } from '@models';

import { assertIsError } from '@shared/utils';
import { TokenExpiredError } from 'jsonwebtoken';

const isAuthHeaderRequired = (url: string) => {
  const noAuthHeaderUrls = [
    '/registerUser',
    '/loginUser',
    '/refreshJwt',
    '/logoutUser',
  ];
  return !noAuthHeaderUrls.some((u) => url.startsWith(u));
};

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    if (!isAuthHeaderRequired(req.url)) {
      return next();
    }

    const headers = req.headers;
    const token = headers['authorization']?.split(' ')[1];

    if (!token) {
      return sendUnauthorizedResponse(res, 'No token provided.', 401);
    }

    const { userId } = await Jwt.decode(token);

    const user = await User.findById(userId);

    const userIdBuffer = Buffer.from(userId.toString());
    const dbUserIdBuffer = Buffer.from(user.getId().toString());

    if (!timingSafeEqual(userIdBuffer, dbUserIdBuffer)) {
      return sendUnauthorizedResponse(res, 'User not found.', 401);
    }

    req.userId = userId;
  } catch (err) {
    assertIsError(err);

    let statusCode;

    if (err instanceof TokenExpiredError) {
      statusCode = 400;
    }

    return sendUnauthorizedResponse(res, err.message, statusCode || 500);
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
    assertIsError(err);
    logger.error(err.message);
  }

  return {
    req,
    res,
    session: req.session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
