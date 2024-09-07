import { JWT } from '@shared';
import { JwtSchema } from '@schemas';

export const getDisplayName = (jwt: JWT | null): string => {
  return JwtSchema.parse(jwt).payload.username;
};
