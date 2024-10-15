import type { Request } from 'express';
import type { AuthenticatedRequest } from '@shared/types';
import type { UserLoginParams, UserLoginResponse } from '@types';
import { generateRevokedToken, verifyToken } from '@utils';
import * as models from '@models';

export const userLogin = async (
  { username, password }: UserLoginParams,
  req: AuthenticatedRequest,
): Promise<UserLoginResponse> => {
  return await models.User.loginAccount({ username, password }, req);
};

export const userLogout = async (req: Request) => {
  if (req.session) {
    const refreshToken = req.session.refreshToken;

    if (refreshToken) {
      const { jti, userId } = verifyToken(refreshToken.token);

      if (jti != null && userId != null) {
        const user = await models.User.findByPk(userId);

        if (user) {
          const revokedToken = await models.RevokedToken.findByPk(jti);

          if (!revokedToken) {
            await generateRevokedToken(userId);
          }
        }
      }
    }
  }

  return { message: 'Logged out successfully.' };
};
