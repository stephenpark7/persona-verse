import type { Request } from 'express';
import { TRPCError } from '@trpc/server';
import type { RefreshTokenResponse } from '@shared/types';
import { generateAccessToken, verifyToken } from '@utils';
import { db } from '@db';

const { User, RevokedToken } = db.models;

export const refreshJwt = async (
  req: Request,
): Promise<RefreshTokenResponse> => {
  try {
    const refreshToken = req.session.refreshToken;

    if (!refreshToken) {
      throw new Error('Session expired. Please login again.');
    }

    const { jti, userId } = verifyToken(refreshToken.token);

    if (!jti) {
      throw new Error('Token does not have a jti.');
    }

    if (userId === undefined || userId === null) {
      throw new Error('Token does not have a userId.');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    if (await RevokedToken.findByPk(jti)) {
      throw new Error('Token already revoked.');
    }

    const payload = {
      userId: parseInt(user.get('id') as string),
      username: user.get('username') as string,
    };

    const accessToken = generateAccessToken(payload);

    if (!accessToken) {
      throw new Error('Failed to generate access token.');
    }

    RevokedToken.create({
      jti,
      UserId: payload.userId,
    });

    return {
      message: 'Token refreshed.',
      jwt: accessToken,
    };
  } catch (_err) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Session expired. Please login again.',
      cause: _err,
    });
  }
};
