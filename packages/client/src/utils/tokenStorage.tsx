import { z } from 'zod';
import type { JWT } from '@shared';
import { JwtSchema } from 'src/schemas';

const TokenStorageSchema = z.object({
  getAccessToken: z.function().returns(z.union([JwtSchema, z.null()])),
  setAccessToken: z
    .function()
    .args(z.union([JwtSchema, z.null()]))
    .returns(z.void()),
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
        return value ? JwtSchema.parse(JSON.parse(value)) : null;
      },
      setAccessToken: (jwt: JWT | null) => {
        if (!jwt) {
          localStorage.removeItem('jwt');
          return;
        }
        localStorage.setItem('jwt', JSON.stringify(JwtSchema.parse(jwt)));
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
