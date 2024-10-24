import type { Request } from 'express';
import { TRPCError } from '@trpc/server';
import type { RefreshTokenResponse } from '@shared/types';
import { Jwt } from '@models';
import { User, RevokedToken } from '@db/models';
import { jwtFactory } from '@factories';
import { TokenType } from '@shared/schemas';
import { assertIsError } from '@shared/utils';

export const refreshJwt = async (
  req: Request,
): Promise<RefreshTokenResponse> => {
  try {
    const token = req.session?.refreshToken.token;

    const { jti, userId } = await Jwt.decode(token);

    const user = await User.findById(userId);

    if (await RevokedToken.isRevoked(jti)) {
      throw new Error('Token revoked.');
    }

    const payload = {
      userId: user.getId(),
      username: user.getUsername(),
    };

    const accessToken = await jwtFactory(TokenType.AccessToken, payload);

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
  } catch (err) {
    assertIsError(err);
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: err.message,
      cause: err,
    });
  }
};
