import type { Request } from 'express';
import {
  compare,
  generateAccessToken,
  generateRefreshToken,
  generateRevokedToken,
  hash,
  validateCreate,
  validateLogin,
  verifyToken,
} from '@utils';
import { User, RevokedToken, RefreshToken, UserProfile } from '@models';
import { CreateUserParams } from '@schemas';
import type { AuthenticatedRequest, Jwt, JwtPayload } from '@shared/types';

export const userCreate: CreateUserParams = async ({
  username,
  email,
  password,
}): Promise<{ message: string }> => {
  await validateCreate(username, email, password);

  const hashedPassword = await hash(password);

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return { message: 'User created successfully.' };
};

interface LoginParams {
  username: string;
  password: string;
}

export type LoginResponse =
  | {
      message: string;
      jwt: Jwt;
      profile: InstanceType<typeof UserProfile> | null;
    }
  | {
      message: string;
    };

export const userLogin = async (
  { username, password }: LoginParams,
  req: AuthenticatedRequest,
): Promise<LoginResponse> => {
  const user = await validateLogin(username, password);

  if (!user) {
    throw new Error('Invalid credentials.');
  }

  const isAuthenticated = await compare(
    password,
    user.get('password') as string,
  );

  if (!isAuthenticated) {
    throw new Error('Invalid credentials.');
  }

  const payload: JwtPayload = {
    userId: parseInt(user.get('id') as string),
    username: username,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  RefreshToken.create({
    jti: refreshToken.payload.jti,
    UserId: payload.userId,
  });

  if (!accessToken || !refreshToken) {
    throw new Error('Error occurred while logging in.');
  }

  if (req.session) {
    req.session.refreshToken = refreshToken;
  }

  const [profile] = await UserProfile.findOrCreate({
    where: { UserId: payload.userId },
    defaults: {
      displayName: username,
    },
    attributes: ['displayName', 'picture', 'bio'],
  });

  if (!profile) {
    throw new Error('Error occurred while logging in.');
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
        const user = await User.findByPk(userId);

        if (user) {
          const revokedToken = await RevokedToken.findByPk(jti);

          if (!revokedToken) {
            await generateRevokedToken(userId);
          }
        }
      }
    }
  }

  return { message: 'Logged out successfully.' };
};
