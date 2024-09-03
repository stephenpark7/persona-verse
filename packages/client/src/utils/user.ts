import { JWT } from '@shared';
import { JWTSchema } from '@interfaces';

export const getDisplayName = (jwt: JWT | null): string => {
  return JWTSchema.parse(jwt).payload.username;
};
