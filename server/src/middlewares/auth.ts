import { NextFunction, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  userId?: string;
}

const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['x-access-token'] as string;

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    req.userId = (decoded as JwtPayload).id;
    next();
  });
};
