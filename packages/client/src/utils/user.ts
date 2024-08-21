import { JWT } from '@shared';
import { JWTSchema } from '@utils';

export const getDisplayName = (jwt: JWT | null): string => {
  return JWTSchema.parse(jwt).payload.username;
};
