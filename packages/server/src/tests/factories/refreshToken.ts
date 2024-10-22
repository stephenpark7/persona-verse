import type { JwtPayload, RefreshToken } from '@shared/types';
import { jwtPayload, TokenType } from '@shared/schemas';
import { jwtFactory } from '@factories';

export const refreshTokenFactory = async (
  payload: JwtPayload,
): Promise<RefreshToken> => {
  jwtPayload.parse(payload);

  return await jwtFactory(TokenType.RefreshToken, payload);
};
