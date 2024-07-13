import { NextFunction, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces';
import { RevokedToken } from '../models';

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const headers = req.headers as IncomingHttpHeaders;
  const token = headers['x-access-token'] as string;
  const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: `Unauthorized. ${process.env.NODE_ENV === 'development' && err}` });
    }
    const decodedToken = decoded as JwtPayload;
    const jti = decodedToken.jti;
  
    if (!jti) {
      console.log(decodedToken);
      return res.status(401).json({ message: `Unauthorized. ${process.env.NODE_ENV === 'development' && 'Token does not have a jti.'}` });
    }

    const revokedToken = RevokedToken.findOne({ where: { jti: jti } });

    if (revokedToken !== null) {
      return res.status(401).json({ message: `Unauthorized. ${process.env.NODE_ENV === 'development' && 'Token was revoked. '}` });
    }

    req.userId = (decoded as JwtPayload).id;
    req.token = token;
    next();
  });
}

export default auth;
