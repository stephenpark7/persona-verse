import { NextFunction, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces';
// import { RevokedToken } from '../models';
import { JWTPayload } from '../interfaces';

async function auth (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['x-access-token'] as string;
  const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      console.log(token, err);
      return statusUnauthorized(res, err.message);
    }

    const decodedToken = decoded as JWTPayload;

    if (!decodedToken.userId) {
      return statusUnauthorized(res, 'Token does not have a userId.');
    }

    req.userId = decodedToken.userId;
    next();
    // const jti = decodedToken.jti;

    // if (jti === null) {
    //   return statusUnauthorized(res, 'Token does not have a jti.');
    // }

    // const revokedToken = RevokedToken.findOne({ where: { jti: jti } });

    // if (revokedToken !== null) {
    //   return statusUnauthorized(res, 'Token was revoked.');
    // }

    // if (!decodedToken.userId) {
    //   return statusUnauthorized(res, 'Token does not have a userId.');
    // }

    // req.userId = decodedToken.userId;
  });
}

// TODO: move to utils, refactor existing code to use this function
function statusUnauthorized(res: Response, message: string) {
  const errorMessage = process.env.NODE_ENV === 'development' ? `\n${message}` : '';
  return res.status(401).json({ message: `Unauthorized.${errorMessage}` });
}

export default auth;
