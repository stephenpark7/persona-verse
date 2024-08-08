import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { JWTPayload } from '../interfaces';
import { db } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateAccessToken = (payload: JWTPayload) => {
  const options = { expiresIn: '5s' };
  const expiresAt = Date.now() + 5 * 1000;
  const token = jwt.sign({ ...payload, expiresAt }, JWT_SECRET, options);
  return {
    token,
    expiresAt,
    payload,
  };
};

export const generateRefreshToken = (payload: JWTPayload) => {
  const options = { expiresIn: '7d' };
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const jti = uuidv4();
  const token = jwt.sign({ ...payload, jti, expiresAt }, JWT_SECRET, options);
  return {
    token,
    expiresAt,
    payload: {
      ...payload,
      jti,
    },
  };
};

export const generateRevokedToken = async (userId: number) => {
  return await db.models.RevokedToken.create({ UserId: userId });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
};
