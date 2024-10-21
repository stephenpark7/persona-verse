import type { JwtPayload, RefreshToken } from '@shared/types';
import { jwtPayload, TokenType } from '@shared/schemas';
import { jwtFactory } from '@factories';

export const refreshTokenFactory = async (
  payload: JwtPayload,
): RefreshToken => {
  jwtPayload.parse(payload);
  const jwt = await jwtFactory(TokenType.RefreshToken, payload);
  return await jwt.generate();
};
