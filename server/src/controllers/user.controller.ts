import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { User } from '../models';

const jwtSecret = process.env.JWT_SECRET || 'secret';

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

  const userData = await User.findOne({ where: { username: username } });
  if (userData !== null) {
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

  const userData: User | null = await User.findOne({ where: { username: username } });

  if (userData === null) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const isAuthenticated = await bcrypt.compare(password, userData.getPassword());

  if (isAuthenticated) {
    const token = jwt.sign({ id: userData.getId() }, jwtSecret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).json({
      id: userData.getId(),
      username: username,
      accessToken: token
    });
  } else {
    return res.status(401).json({ message: 'Invalid username/password.' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out.' });
};
