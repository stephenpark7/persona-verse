import { Request, Response } from 'express';
import { db } from '../db';
import { JWTPayload, LoginParams } from '../interfaces';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  usernameAlreadyExists,
  emailAlreadyExists,
  missingFields,
} from '../utils/validator';
import { generateAccessToken, generateRefreshToken, verifyToken, generateRevokedToken } from '../utils/jwt';
import { compare, hash } from '../utils/encryption';

const { User, RevokedToken, UserProfile } = db.models;

const validateUserRegister = async (username: string, email: string, password: string): Promise<boolean> => {
  if (missingFields(username, email, password)) {
    throw new Error('Missing field(s).');
  }

  if (!validateUsername(username)) {
    throw new Error('Invalid username.');
  }

  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  if (!validatePassword(password)) {
    throw new Error('Invalid password. Please enter a password that is at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
  }

  if (await usernameAlreadyExists(username)) {
    throw new Error('Username already in use.');
  }

  if (await emailAlreadyExists(email)) {
    throw new Error('Email address already in use.');
  }

  return true;
};

interface CreateParams {
  username: string,
  email: string,
  password: string,
}

const create = async ({ 
  username, 
  email, 
  password 
}: CreateParams): Promise<{ message: string }> => {
  await validateUserRegister(username, email, password);

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

    if (missingFields(username, password)) {
      return res.status(400).json({ message: 'Missing field(s).' });
    }

    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isAuthenticated = await compare(password, user.get('password') as string);

    if (!isAuthenticated) {
      return res.status(401).json({ message: 'Invalid username/password.' });
    }

    const payload: JWTPayload = {
      userId: parseInt(user.get('id') as string),
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
