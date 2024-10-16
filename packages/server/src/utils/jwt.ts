import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import type { AccessToken, JwtPayload, RefreshToken } from '@shared/types';
import * as models from '@db/models';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateAccessToken = (payload: JwtPayload): AccessToken => {
  const options = { expiresIn: '30m' };
  const expiresAt = Date.now() + 30 * 60 * 1000;
  const token = jwt.sign({ ...payload, expiresAt }, JWT_SECRET, options);

  if (!token) {
    throw new Error(
      'Internal server error occurred while generating access token.',
    );
  }

  const accessToken = {
    token,
    expiresAt,
    payload,
  };

  return accessToken;
};

export const generateRefreshToken = async (
  payload: JwtPayload,
): Promise<RefreshToken> => {
  const options = { expiresIn: '7d' };
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const jti = uuidv4();
  const token = jwt.sign({ ...payload, jti, expiresAt }, JWT_SECRET, options);

  if (!token) {
    throw new Error(
      'Internal server error occurred while generating refresh token.',
    );
  }

  const refreshToken = {
    token,
    expiresAt,
    payload: {
      ...payload,
      jti,
    },
  };

  const userExists = await models.User.findByPk(payload.userId);

  if (!userExists) {
    throw new Error('User does not exist.');
  }

  const refreshTokenInstance = await models.RefreshToken.create({
    jti,
    UserId: payload.userId,
  });

  if (refreshTokenInstance == null) {
    throw new Error(
      'Internal server error occurred while generating refresh token.',
    );
  }

  return refreshToken;
};

export const generateRevokedToken = async (
  userId: number,
): Promise<models.RevokedToken> => {
  return await models.RevokedToken.create({ UserId: userId });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET);
};
