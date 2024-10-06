import type { JwtPayload } from '@shared/types';
import { jwtPayload } from '@shared/schemas';
import { generateRefreshToken } from '@utils';

export const refreshTokenFactory = (payload: JwtPayload) => {
  jwtPayload.parse(payload);
  return generateRefreshToken(payload);
};
