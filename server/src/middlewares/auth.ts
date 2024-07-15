import { NextFunction, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces';
import { JWTPayload } from '../interfaces';
import { statusUnauthorized } from '../utils/request';

async function auth (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['x-access-token'] as string;
  const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return statusUnauthorized(res, err.message);
    }

    const decodedToken = decoded as JWTPayload;
    if (decodedToken.userId === null) {
      return statusUnauthorized(res, 'Token does not have a userId.');
    }

    req.userId = decodedToken.userId;
    next();
  });
}

export default auth;
