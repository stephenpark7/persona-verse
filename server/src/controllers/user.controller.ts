import { Request, Response } from 'express';
import { RevokedToken, User } from '../models';
import { AuthenticatedRequest, JWTPayload, LoginParams } from '../interfaces';
import { validateUsername, validateEmail, validatePassword, usernameAlreadyExists, missingFields } from '../utils/validation';
import { generateAccessToken, generateRefreshToken, generateRevokedToken, decodeToken } from '../utils/jwt';
import bcrypt from '../utils/bcrypt';

export const create = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!validateUsername(username)) {
      return res.status(400).json({ message: 'Invalid username.' });
    }
  
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }
  
    if (!validatePassword(password)) {
      return res.status(400).json({ message: `Invalid password. Please enter a password that is at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.` });
    }
  
    if (await usernameAlreadyExists(username)) {
      return res.status(400).json({ message: 'Username already in use.' });
    }
  
    const hashedPassword = await bcrypt.hash(password);

    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      displayName: username
    });

    res.status(201).json({ message: 'Account created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password }: LoginParams  = req.body;

  if (missingFields(username, password)) {
    return res.status(400).json({ message: 'Missing field(s).' });
  }

  const user: User | null = await User.findOne({ where: { username: username } });

  if (user === null) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const isAuthenticated = await bcrypt.compare(password, user.getPassword());

  if (!isAuthenticated) {
    return res.status(401).json({ message: 'Invalid username/password.' });
  }

  const payload: JWTPayload = { userId: user.getId() };
  const accessToken = generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload.userId!);

  if (req.session) {
    req.session.token = refreshToken;
  }

  res.status(200).json({
    id: user.getId(),
    username: username,
    accessToken: accessToken.token,
    expiresAt: new Date(accessToken.expiresAt),
  });
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(400).json({ message: 'Missing userId.' });
    }

    const user: User | null = await User.findOne({ where: { id: userId } });

    if (user === null) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (req.session && req.session.token) {
      const decodedToken = await decodeToken(req.session.token);
      const jti = decodedToken.jti;
      const revokedToken = await RevokedToken.findOne({ where: { jti: jti } });
      if (revokedToken) {
        return res.status(400).json({ message: 'Token already revoked.' });
      }
      await req.session.destroy();
    }

    generateRevokedToken(user.getId());

    res.status(200).json({ message: 'Logged out.' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out.' });
  }
};
