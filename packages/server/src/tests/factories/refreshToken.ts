import type { JwtPayload, RefreshToken } from '@shared/types';
import { jwtPayload, refreshTokenPayload, TokenType } from '@shared/schemas';
import { jwtFactory } from '@factories';

export const refreshTokenFactory = async (
  payload: JwtPayload,
): Promise<RefreshToken> => {
  jwtPayload.parse(payload);

  const refreshToken = await jwtFactory(TokenType.RefreshToken, payload);

  refreshTokenPayload.parse(refreshToken.payload);

  return refreshToken;
};
