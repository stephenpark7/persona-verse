import type { NextFunction, Request, Response } from 'express';
import type { CreateContextParams } from '@shared/types';
import { assertIsError, assertIsException } from '@shared/utils';
import {
  logger,
  isAuthHeaderRequired,
  extractAuthTokenFromRequest,
} from '@utils';
import { User } from '@db/models';
import { Jwt } from '@models';

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    if (!isAuthHeaderRequired(req)) {
      return next();
    }

    const token = extractAuthTokenFromRequest(req);

    const { userId } = await Jwt.decode(token);

    await User.findById(userId);

    req.userId = userId;
  } catch (err) {
    assertIsException(err);
    res.status(err.getStatusCode()).json({
      message: err.message,
    });
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
