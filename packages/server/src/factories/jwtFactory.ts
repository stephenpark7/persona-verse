import type { Jwt as JwtData, JwtPayload } from '@shared/types';
import { TokenType } from '@shared/schemas';
import { AccessToken, RefreshToken } from '@models';

export const jwtFactory = (type: TokenType, payload: JwtPayload): JwtData => {
  let jwt: JwtData;

  if (type === TokenType.AccessToken) {
    jwt = new AccessToken(payload);
  } else if (type === TokenType.RefreshToken) {
    jwt = new RefreshToken(payload);
  } else {
    throw new Error('Invalid token type.');
  }

  return jwt.generate();
};
