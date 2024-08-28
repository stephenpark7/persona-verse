import { jwtFactory } from './jwt';

export enum UserTypes {
  Guest = 'guest',
  User = 'user',
};

export const useUserStateFactory = (
  type: UserTypes = UserTypes.Guest,
  overrides = {},
) => {

  const types = [
    {
      type: UserTypes.Guest,
      jwt: null,
      isLoggedIn: false,
      tweets: null,
    },
    {
      type: UserTypes.User,
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
