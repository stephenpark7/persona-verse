import type { AuthenticatedRequest } from '@shared/types';
import type { UserLoginParams, UserLoginResponse } from '@types';
import { User } from '@db/models';

export const userLogin = async (
  { username, password }: UserLoginParams,
  req: AuthenticatedRequest,
): Promise<UserLoginResponse> => {
  return await User.loginAccount({ username, password }, req);
};
