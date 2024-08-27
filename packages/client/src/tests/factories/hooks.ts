import { jwtFactory } from './jwt';

export const useUserStateFactory = (overrides = {}) => {
  return {
    jwt: jwtFactory(),
    isLoggedIn: true,
    tweets: null,
    ...overrides,
  };
};
