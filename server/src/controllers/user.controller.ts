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
import { compare, hash } from '../utils/bcrypt';

const { User, RevokedToken, UserProfile } = db.models;

const create = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    if (!validateUsername(username)) {
      return res.status(400).json({ message: 'Invalid username.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid password. Please enter a password that is at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.' });
    }

    if (await usernameAlreadyExists(username)) {
      return res.status(400).json({ message: 'Username already in use.' });
    }

    if (await emailAlreadyExists(email)) {
      return res.status(400).json({ message: 'Email address already in use.' });
    }

    const hashedPassword = await hash(password);

    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Account created successfully.' });
  } catch (error: unknown) {
    return res.status(500).json({ message: 'Error creating account.' })
  }
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
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error logging in.' });
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
  } catch (error: unknown) {
    const errorMessage = process.env.NODE_ENV === 'development' ? `\n${error}` : '';
    res.status(500).json({ message: errorMessage });
  }
};

export { create, login, logout };
