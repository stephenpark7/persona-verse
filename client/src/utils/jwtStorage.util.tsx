import { JWT } from '../interfaces';

export const JwtStorage = {
  getAccessToken: () => {
    const value: string = localStorage.getItem('jwt') as string;
    return value ? JSON.parse(value) : null;
  },
  setAccessToken: (jwt: JWT) => {
    if (jwt === null) {
      return;
    }
    
    localStorage.setItem('jwt', JSON.stringify(jwt));
  },
  clearAccessToken: () => {
    localStorage.removeItem('jwt');
  },
};
