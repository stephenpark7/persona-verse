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

// TODO: a refresh token might be expired
// but the access token might still be valid
// in that case, we should still be able to
// log the user out.
// - Do not throw an error if the refresh token is expired or invalid
// - If it is expired or invalid, log the user out anyway

// Reminder falsy values are:
// '', 0, false, null, or undefined

export const userLogout = async (
  req: Request,
) => {
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
