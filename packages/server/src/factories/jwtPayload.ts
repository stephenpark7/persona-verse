import type { JwtPayload } from '../types';
import { jwtPayload } from '../schemas';

export const jwtPayloadFactory = (payload: JwtPayload) => {
  jwtPayload.parse(payload);
  return payload;
};
