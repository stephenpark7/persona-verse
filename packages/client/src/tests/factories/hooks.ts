import { jwtFactory } from './jwt';

export enum UserType {
  GUEST = 'guest',
  USER = 'user',
}

export const useUserStateFactory = (type: UserType, overrides = {}) => {
  const types = [
    {
      type: UserType.GUEST,
      jwt: null,
      isLoggedIn: false,
      tweets: null,
    },
    {
      type: UserType.USER,
      jwt: jwtFactory(),
      isLoggedIn: true,
      tweets: null,
    },
  ];

  const getProperties = () => {
    const ind = types.findIndex((t) => t.type === type);

    if (ind === -1) {
      throw new Error(`Invalid user type: ${type}`);
    }

    return { ...types[ind] };
  };

  return () => {
    return {
      ...getProperties(),
      ...overrides,
    };
  };
};
