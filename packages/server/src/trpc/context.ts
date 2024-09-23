import * as trpcExpress from '@trpc/server/adapters/express';
import { NextFunction, Response, Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JWTPayload } from '@interfaces';
import { sendUnauthorizedResponse } from '@utils';
interface ExtendedRequest extends Request {
  userId?: number;
}

export const auth = async (
  req: ExtendedRequest, 
  res: Response, 
  next: NextFunction,
): Promise<Response | void> => {
  if (req.url.startsWith('/loginUser') || 
      req.url.startsWith('/registerUser') || 
      req.url.startsWith('logoutUser')
  ) {
    return next();
  }

  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['authorization']?.split(' ')[1];
  const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;

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
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
