import { JWT } from '@shared';
import { JwtSchema } from '@interfaces';

export const getDisplayName = (jwt: JWT | null): string => {
  return JwtSchema.parse(jwt).payload.username;
};
