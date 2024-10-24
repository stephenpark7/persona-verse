import type { UserCreateParams, UserCreateResponse } from '@shared/types';
import { User } from '@db/models';

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
