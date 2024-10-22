import type { Request } from 'express';
import { TRPCError } from '@trpc/server';
import type { RefreshTokenResponse } from '@shared/types';
import { Jwt } from '@models';
import { User, RevokedToken } from '@db/models';
import { jwtFactory } from '@factories';
import { TokenType } from '@shared/schemas';

export const refreshJwt = async (
  req: Request,
): Promise<RefreshTokenResponse> => {
  try {
    // const session = req.session;

    // if (!session) {
    //   throw new Error('Session not found.');
    // }

    // console.log('``:', session);

    // const token: string = session.refreshToken.token;

    const token = req.session?.refreshToken.token;

    console.log('``:', token);

    const { jti, userId } = await Jwt.decode(token);

    console.log(jti, userId);

    const user = await User.findById(userId);

    if (await RevokedToken.isRevoked(jti)) {
      throw new Error('Token revoked.');
    }

    const payload = {
      userId: user.getId(),
      username: user.getUsername(),
    };

    const accessToken = await jwtFactory(TokenType.AccessToken, payload, true);

    const revokedToken = await RevokedToken.create({
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
