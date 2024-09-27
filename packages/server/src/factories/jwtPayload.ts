import type { JwtPayload } from '../types';
import { jwtPayload } from '@shared/schemas';

export const jwtPayloadFactory = (payload: JwtPayload) => {
  jwtPayload.parse(payload);
  return payload;
};
