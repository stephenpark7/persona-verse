import type { Request } from 'express';
import { TRPCError } from '@trpc/server';
import type { RefreshTokenResponse } from '@shared/types';
import { verifyToken } from '@utils';
import { User, RevokedToken } from '@db/models';
import { jwtFactory } from 'src/factories';
import { TokenType } from '@shared/schemas';

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

    const accessToken = jwtFactory(TokenType.AccessToken, payload);

    const revokedToken = RevokedToken.create({
      jti,
      UserId: payload.userId,
    });

    if (!revokedToken) {
      throw new Error('Failed to revoke refresh token.');
    }

    return {
      message: 'Token refreshed.',
      jwt: accessToken.value(),
    };
  } catch (_err) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Session expired. Please login again.',
      cause: _err,
    });
  }
};
