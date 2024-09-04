import { JWT } from '@shared';
import { JwtSchema } from 'src/schemas';

export const getDisplayName = (jwt: JWT | null): string => {
  return JwtSchema.parse(jwt).payload.username;
};
