import { Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { DataTypes, StringDataTypeConstructor } from 'sequelize';

interface CustomRequest extends Request {
  userId?: string;
}

const jwtSecret = process.env.JWT_SECRET || 'secret';

export const create = async (req: CustomRequest, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing field(s)' });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ error: 'Username must contain only alphanumeric characters.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const userData = await User.findOne({ where: { username: username } });
  if (userData !== null) {
    return res.status(400).json({ error: 'Username already in use.' });
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
    res.status(500).json({ error: 'Error creating account.' });
  }
};

export const login = async (req: CustomRequest, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing field(s)' });
  }

  const userData: User | null = await User.findOne({ where: { username: username } });

  if (userData === null) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const isAuthenticated = await bcrypt.compare(password, userData?.password?.toString() ?? '');

  if (isAuthenticated) {
    const token = jwt.sign({ id: userData.id }, jwtSecret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).json({
      id: userData.id,
      username: username,
      accessToken: token
    });
  } else {
    return res.status(401).json({ error: 'Invalid password.' });
  }
};