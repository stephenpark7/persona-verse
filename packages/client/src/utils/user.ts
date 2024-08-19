import { JWT } from '@shared';

export const getDisplayName = (jwt: JWT | null): string => {
  if (!jwt) return '';
  return jwt.payload.username;
};
