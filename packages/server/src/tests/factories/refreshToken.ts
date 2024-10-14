import type { JwtPayload, RefreshToken } from '@shared/types';
import { jwtPayload } from '@shared/schemas';
import { generateRefreshToken } from '@utils';

export const refreshTokenFactory = async (
  payload: JwtPayload,
): RefreshToken => {
  jwtPayload.parse(payload);
  return await generateRefreshToken(payload);
};
