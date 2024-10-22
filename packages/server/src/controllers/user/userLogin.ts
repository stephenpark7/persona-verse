import type { Request } from 'express';
import type { UserLoginParams, UserLoginResponse } from '@shared/types';
import { User } from '@db/models';

export const userLogin = async (
  { username, password }: UserLoginParams,
  req: Request,
): Promise<UserLoginResponse> => {
  return await User.loginAccount({ username, password }, req);
};
