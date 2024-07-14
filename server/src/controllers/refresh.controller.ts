import { Response } from 'express';
import { decodeToken, generateAccessToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../interfaces';
import { RevokedToken, Tweet, User } from '../models';

export const refresh = async (req: AuthenticatedRequest, res: Response) => {
  const token = req?.session?.token;
  
  if (token === null) {
    return res.status(500).json({ message: 'Session not found.' });
  }

  try {
    const decodedToken = await decodeToken(token);
    const userId = decodedToken.id;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'No user found.' });
    }

    const revokedToken = await RevokedToken.findOne({ where: { jti: decodedToken.jti } });
    if (revokedToken !== null) {
      return res.status(401).json({ message: 'Token revoked.' });
    }

    if (decodedToken.userId === null) {
      return res.status(401).json({ message: 'Token does not have a userId.' });
    }

    const accessToken = generateAccessToken({ id: userId });
    res.status(200).json({ token: accessToken.token, expiresAt: accessToken.expiresAt });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'development' ? `${error}` : '';
    res.status(500).json({ message: `Failed to refresh token.${errorMessage}` });
  }
};
