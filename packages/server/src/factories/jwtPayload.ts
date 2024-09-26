import { jwtPayload, type JwtPayload } from '@shared';

export const jwtPayloadFactory = (payload: JwtPayload) => {
  jwtPayload.parse(payload);
  return payload;
};
