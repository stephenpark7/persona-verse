import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { AccessToken, JwtPayload, RefreshToken } from '@shared';
import { db } from '@db';
import { RevokedToken } from '@models';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateAccessToken = (payload: JwtPayload): AccessToken => {
  const options = { expiresIn: '30m' };
  const expiresAt = Date.now() + 30 * 60 * 1000;
  const token = jwt.sign({ ...payload, expiresAt }, JWT_SECRET, options);
  return {
    token,
    expiresAt,
    payload,
  };
};

export const generateRefreshToken = (payload: JwtPayload): RefreshToken => {
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

export const generateRevokedToken = async (
  userId: number,
): Promise<RevokedToken> => {
  return await db.models.RevokedToken.create({ UserId: userId });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
