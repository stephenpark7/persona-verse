import { z } from 'zod';
import type { JWT } from '@shared';

const JWTSchema = z.object({
  token: z.string(),
  expiresAt: z.number(),
  payload: z.object({
    userId: z.number(),
    username: z.string(),
  }),
});

const TokenStorageSchema = z.object({
  getAccessToken: z.function().returns(z.union([ JWTSchema, z.null() ])),
  setAccessToken: z.function().args(z.union([ JWTSchema, z.null() ])).returns(z.void()),
  clearAccessToken: z.function().returns(z.void()),
});

class TokenStorage {
  getAccessToken: () => JWT | null;
  setAccessToken: (jwt: JWT | null) => void;
  clearAccessToken: () => void;

  constructor() {
    const data = {
      getAccessToken: (): JWT | null => {
        const value: string | null = localStorage.getItem('jwt');
        return value ? JWTSchema.parse(JSON.parse(value)) : null;
      },
      setAccessToken: (jwt: JWT | null) => {
        if (!jwt) {
          localStorage.removeItem('jwt');
          return;
        }
        localStorage.setItem('jwt', JSON.stringify(JWTSchema.parse(jwt)));
      },
      clearAccessToken: () => {
        localStorage.removeItem('jwt');
      },
    };

    const parsedData = TokenStorageSchema.parse(data);

    this.getAccessToken = parsedData.getAccessToken;
    this.setAccessToken = parsedData.setAccessToken;
    this.clearAccessToken = parsedData.clearAccessToken;
  }
}

export const tokenStorage = new TokenStorage();
