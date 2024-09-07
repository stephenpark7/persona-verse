import { JWT } from '@shared';
import { jwtSchema } from '@schemas';

export const getDisplayName = (jwt: JWT | null): string => {
  return jwtSchema.parse(jwt).payload.username;
};
