import { jwtFactory } from './jwt';

// TODO: rename to stub type, or traits, or something similar

// TODO: Guest should be GUEST, User should be USER
// since they are constants
export enum UserType {
  Guest = 'guest',
  User = 'user',
}

export const useUserStateFactory = (type: UserType, overrides = {}) => {
  const types = [
    {
      type: UserType.Guest,
      jwt: null,
      isLoggedIn: false,
      tweets: null,
    },
    {
      type: UserType.User,
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

  return {
    ...getProperties(),
    ...overrides,
  };
};
