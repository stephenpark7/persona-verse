import type { UserCreateParams, UserCreateResponse } from '@types';
import { User } from '@models';

export const userCreate = async ({
  username,
  email,
  password,
}: UserCreateParams): Promise<UserCreateResponse> => {
  return await User.createAccount({
    username,
    email,
    password,
  });
};
