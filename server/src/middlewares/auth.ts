import { NextFunction, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces';

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['x-access-token'] as string;
  const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    req.userId = (decoded as JwtPayload).id;
    req.token = token;
    next();
  });
}

export default auth;
