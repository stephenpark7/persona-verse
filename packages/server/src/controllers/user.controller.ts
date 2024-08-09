import { Request, Response } from 'express';
import { db } from '../db';
import { JWTPayload, LoginParams } from '../interfaces';
import {
  validateCreate,
  validateLogin,
} from '../utils/validator';
import { generateAccessToken, generateRefreshToken, verifyToken, generateRevokedToken } from '../utils/jwt';
import { compare, hash } from '../utils/encryption';
import { CreateParams } from '../interfaces';

const { User, RevokedToken, UserProfile } = db.models;

const create = async ({ 
  username, 
  email, 
  password 
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

const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: LoginParams = req.body;

    let user;

    try {
      user = await validateLogin(username, password);
    }
    catch (err: unknown) {
      return res.status(400).json({ message: err });
    }

    const isAuthenticated = await compare(password, user!.get('password') as string);

    if (!isAuthenticated) {
      return res.status(401).json({ message: 'Invalid username/password.' });
    }

    const payload: JWTPayload = {
      userId: parseInt(user!.get('id') as string),
      username: username,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload!);

    if (!accessToken || !refreshToken) {
      return res.status(500).json({ message: 'Error generating tokens.' });
    }

    if (req.session) {
      req.session.refreshToken = refreshToken;
    }

    const profile = UserProfile.findOrCreate({
      where: { UserId: payload.userId },
      defaults: {
        displayName: username,
      },
    });

    res.status(200).json({
      message: 'Logged in successfully.',
      jwt: accessToken,
      profile: profile,
    });
  } catch (_err: unknown) {
    console.error('Error while trying to log in a user: ', _err);
    res.status(500).json({ message: 'Error occurred while logging in.' });
  }
};

const logout = async (
  req: Request,
  res: Response,
) => {
  try {
    const { refreshToken } = req.session as JWTPayload;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Missing token.' });
    }

    const { jti, userId } = verifyToken(refreshToken.token);

    if (!jti) {
      return res.status(400).json({ message: 'Token does not have a jti.' });
    }

    if (userId === undefined || userId === null) {
      return res.status(400).json({ message: 'Token does not have a userId.' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (await RevokedToken.findByPk(jti)) {
      return res.status(400).json({ message: 'Token already revoked.' });
    }

    await generateRevokedToken(userId);

    req.session = null;

    res.status(200).json({ message: 'Logged out.' });
  } catch (_err: unknown) {
    console.error('Error while trying to log out a user: ', _err);
    res.status(500).json({ message: 'Error occurred while logging out.' });
  }
};

export { create, login, logout };
