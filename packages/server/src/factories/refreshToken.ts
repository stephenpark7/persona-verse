import type { JwtPayload } from '@shared';
import { jwtPayload } from '@shared';
import { generateRefreshToken } from '@utils';

export const refreshTokenFactory = (payload: JwtPayload) => {
  // TODO: this line breaks @shared
  // jwtPayload.parse(payload);

  // we need to rename jwt.d.ts to jwt.ts
  // probably also add eslint, package.json, and tsconfig.json
  // for shared package folder
  return generateRefreshToken(payload);
};
