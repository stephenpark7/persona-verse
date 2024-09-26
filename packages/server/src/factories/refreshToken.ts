import { JwtPayload } from '@shared';
import { generateRefreshToken } from '@utils';

export const refreshTokenFactory = (payload: JwtPayload) => {
  const token = generateRefreshToken(payload);
  return token;
};
