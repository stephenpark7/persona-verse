import { z } from 'zod';
import { type Jwt, jwtSchema } from '@schemas';

const TokenStorageSchema = z.object({
  getAccessToken: z.function().returns(z.union([jwtSchema, z.null()])),
  setAccessToken: z
    .function()
    .args(z.union([jwtSchema, z.null()]))
    .returns(z.void()),
  clearAccessToken: z.function().returns(z.void()),
});

// TODO: shorten the name of methods, for example: getAccessToken -> getToken

class TokenStorage {
  getAccessToken: () => Jwt | null;
  setAccessToken: (jwt: Jwt | null) => void;
  clearAccessToken: () => void;

  constructor() {
    const data = {
      getAccessToken: (): Jwt | null => {
        const value: string | null = localStorage.getItem('jwt');
        return value ? jwtSchema.parse(JSON.parse(value)) : null;
      },
      setAccessToken: (jwt: Jwt | null) => {
        if (!jwt) {
          localStorage.removeItem('jwt');
          return;
        }
        localStorage.setItem('jwt', JSON.stringify(jwtSchema.parse(jwt)));
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
