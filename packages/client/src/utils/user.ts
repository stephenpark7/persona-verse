import { Jwt } from '@schemas';
import { jwtSchema } from '@schemas';

export const getDisplayName = (jwt: Jwt | null): string => {
  return jwtSchema.parse(jwt).payload.username;
};
