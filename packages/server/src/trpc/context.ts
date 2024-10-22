import { timingSafeEqual } from 'crypto';

import type { IncomingHttpHeaders } from 'http';
import type { NextFunction, Request, Response } from 'express';

import type { CreateContextParams } from '@shared/types';

import { logger, sendUnauthorizedResponse } from '@utils';

import { User } from '@db/models';

import { Jwt } from '@models';

import { assertIsError } from '@shared/utils';

const isAuthHeaderRequired = (url: string) => {
  const noAuthHeaderUrls = ['/registerUser', '/loginUser', '/refreshJwt'];
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

    const headers = req.headers as IncomingHttpHeaders;
    const token = headers['authorization']?.split(' ')[1];

    if (!token) {
      return sendUnauthorizedResponse(res, 'No token provided.', 401);
    }

    const decoded = await Jwt.decode(token);

    req.userId = decoded.userId as number;

    const user = await User.findById(req.userId);

    const userIdBuffer = Buffer.from(req.userId.toString());
    const dbUserIdBuffer = Buffer.from(user.getId().toString());

    if (!timingSafeEqual(userIdBuffer, dbUserIdBuffer)) {
      return sendUnauthorizedResponse(res, 'User not found.', 401);
    }
  } catch (err) {
    assertIsError(err);
    return sendUnauthorizedResponse(res, err.message, 500);
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
    logger.error(err);
  }

  return {
    req,
    res,
    session: req.session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
