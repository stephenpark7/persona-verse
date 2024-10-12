import type { UserCreateParams } from '@shared/types';
import { User } from '@models';
import { RegisterResponse } from '@schemas';

export const userCreate = async ({
  username,
  email,
  password,
}: UserCreateParams): Promise<RegisterResponse> => {
  await User.createAccount({
    username,
    email,
    password,
  });

  return { message: 'User created successfully.' };
};
