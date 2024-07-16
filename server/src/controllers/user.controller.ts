import { Request, Response } from 'express';
import { RevokedToken, User } from '../models';
import { AuthenticatedRequest, JWTPayload, LoginParams } from '../interfaces';
import Validator from '../utils/validation';
import JWT from '../utils/jwt';
import BCrypt from '../utils/bcrypt';

export const create = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!Validator.validateUsername(username)) {
      return res.status(400).json({ message: 'Invalid username.' });
    }
  
    if (!Validator.validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }
  
    if (!Validator.validatePassword(password)) {
      return res.status(400).json({ message: `Invalid password. Please enter a password that is at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.` });
    }
  
    if (await Validator.usernameAlreadyExists(username)) {
      return res.status(400).json({ message: 'Username already in use.' });
    }
  
    const hashedPassword = await BCrypt.hash(password);

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

  if (Validator.missingFields(username, password)) {
    return res.status(400).json({ message: 'Missing field(s).' });
  }

  const user = await User.findOne({ where: { username: username } });

  if (user == null) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const isAuthenticated = await BCrypt.compare(password, user.getPassword());

  if (!isAuthenticated) {
    return res.status(401).json({ message: 'Invalid username/password.' });
  }

  const payload: JWTPayload = { 
    userId: user.getId(),
    username: username,
  };

  const accessToken = JWT.generateAccessToken(payload);
  const refreshToken = JWT.generateRefreshToken(payload!);

  if (accessToken == null || refreshToken == null) {
    return res.status(500).json({ message: 'Error generating tokens.' });
  }

  req.session = {
    refreshToken: refreshToken
  };

  res.status(200).json(accessToken);
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { session } = req;
    const { refreshToken } = session as JWTPayload;

    if (refreshToken == null) {
      return res.status(400).json({ message: 'Missing token.' });
    }

    const { jti, userId } = JWT.verifyToken(refreshToken.token);

    if (jti == null) {
      return res.status(400).json({ message: 'Token does not have a jti.' });
    }

    if (userId == null) {
      return res.status(400).json({ message: 'Token does not have a userId.' });
    }

    const user = await User.findByPk(userId);

    if (user == null) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (await RevokedToken.findByPk(jti) != null) {
      return res.status(400).json({ message: 'Token already revoked.' });
    }
  
    await JWT.generateRevokedToken(userId);
    req.session = null;
    res.status(200).json({ message: 'Logged out.' });
  } catch (error: Error | any) {
    const errorMessage = process.env.NODE_ENV === 'development' ? `\n${error.message}` : '';
    res.status(500).json({ message: errorMessage });
  }
};
