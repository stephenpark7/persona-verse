import { Request } from 'express';
import { db } from '@db';
import { CreateParams, JWT, JWTPayload, LoginParams } from '@interfaces';
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

const { User, RevokedToken, UserProfile } = db.models;

export const userCreate = async ({ 
  username, 
  email, 
  password, 
}: CreateParams): Promise<{ message: string }> => {
  await validateCreate(username, email, password);

  const hashedPassword = await hash(password);

  await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  return { message: 'User created successfully.' };
};

export const userLogin = async ({ 
  username, 
  password, 
}: LoginParams, req: Request,
): Promise<{ message: string, jwt: JWT, profile: InstanceType<typeof UserProfile> | null } | { message: string }> => {
  const user = await validateLogin(username, password);

  const isAuthenticated = await compare(password, user!.get('password') as string);

  if (!isAuthenticated) {
    throw new Error('Invalid credentials.');
  }

  const payload: JWTPayload = {
    userId: parseInt(user!.get('id') as string),
    username: username,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload!);

  if (!accessToken || !refreshToken) {
    throw new Error('Error occurred while logging in.');
  }

  if (req.session) {
    req.session.refreshToken = refreshToken;
  }

  const [ profile ] = await UserProfile.findOrCreate({
    where: { UserId: payload.userId },
    defaults: {
      displayName: username,
    },
    attributes: [ 'displayName', 'picture', 'bio' ],
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

export const userLogout = async (
  req: Request,
) => {
  try {
    if (!req.session) {
      throw new Error('Session not found.');
    }

    const refreshToken = req.session.refreshToken;

    if (!refreshToken) {
      throw new Error('Refresh token not found.');
    }

    const { jti, userId } = verifyToken(refreshToken.token);

    if (!jti) {
      throw new Error('Token does not have a jti.');
    }

    if (userId === undefined || userId === null) {
      throw new Error('Token does not have a userId.');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return new Error('User not found.');
    }

    if (await RevokedToken.findByPk(jti)) {
      throw new Error('Token already revoked.');
    }

    await generateRevokedToken(userId);

    return { message: 'Logged out successfully.' };
  } catch (_err: unknown) {
    return { message: 'Error while logging out.' };
  }
};
