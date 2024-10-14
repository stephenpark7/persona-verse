import type { Request } from 'express';
import type { AuthenticatedRequest, JwtPayload } from '@shared/types';
import type { UserLoginParams, UserLoginResponse } from '@types';
import {
  validatePassword,
  generateAccessToken,
  generateRefreshToken,
  generateRevokedToken,
  validateUserLogin,
  verifyToken,
} from '@utils';
import * as models from '@models';

export const userLogin = async (
  { username, password }: UserLoginParams,
  req: AuthenticatedRequest,
): Promise<UserLoginResponse> => {
  const user = await validateUserLogin(username, password);

  await validatePassword(password, user);

  const payload: JwtPayload = {
    userId: parseInt(user.get('id') as string),
    username: username,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  if (req.session) {
    req.session.refreshToken = refreshToken;
  }

  const [profile] = await models.UserProfile.findOrCreate({
    where: { UserId: payload.userId },
    defaults: {
      displayName: username,
    },
    attributes: ['displayName', 'picture', 'bio'],
  });

  if (!profile) {
    throw new Error('Internal server error occurred while logging in.');
  }

  return {
    message: 'Logged in successfully.',
    jwt: accessToken,
    profile: profile,
  };
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
