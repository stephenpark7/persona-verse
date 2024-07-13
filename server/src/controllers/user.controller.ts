import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { RevokedToken, User } from '../models';
import { AuthenticatedRequest } from '../interfaces';

export const create = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing field(s)' });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: 'Username must contain only alphanumeric characters.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  const user = await User.findOne({ where: { username: username } });
  if (user !== null) {
    return res.status(400).json({ message: 'Username already in use.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      displayName: username
    });
    res.status(201).json({ message: 'Account created.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing field(s)' });
  }

  const user: User | null = await User.findOne({ where: { username: username } });

  if (user === null) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const isAuthenticated = await bcrypt.compare(password, user.getPassword());

  if (!isAuthenticated) {
    return res.status(401).json({ message: 'Invalid username/password.' });
  }
  const payload = { id: user.getId() };
  const secret = process.env.JWT_SECRET || 'secret';
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secret, options);

  res.status(200).json({
    id: user.getId(),
    username: username,
    accessToken: token
  });
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { token, userId } = req;

    if (!token || !userId) {
      return res.status(400).json({ message: 'Missing field(s)' });
    }

    const user: User | null = await User.findOne({ where: { id: userId } });

    const revokedToken = RevokedToken.create({ User: user });

    res.status(200).json({ message: 'Logged out.' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out.' });
  }
};
