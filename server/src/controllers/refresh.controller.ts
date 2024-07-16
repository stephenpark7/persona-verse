import { Response } from 'express';
import JWT from '../utils/jwt';
import { AuthenticatedRequest } from '../interfaces';
import { RevokedToken, User } from '../models';

export const refresh = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const token = req.session?.refreshToken;
  
    if (token == null) {
      return res.status(500).json({ message: 'Session not found.' });
    }

    const decodedToken = JWT.verifyToken(token);
    const { userId, jti } = decodedToken;

    if (userId == null) {
      return res.status(401).json({ message: 'Token does not have a userId.' });
    }

    if (jti == null) {
      return res.status(401).json({ message: 'Token does not have a jti.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'No user found.' });
    }

    const revokedToken = await RevokedToken.findByPk(jti);
    if (revokedToken != null) {
      return res.status(401).json({ message: 'Token revoked.' });
    }

    const payload = {
      userId: user.getId(),
      username: user.getUsername(),
    };

    const accessToken = JWT.generateAccessToken(payload);

    if (accessToken == null) {
      return res.status(500).json({ message: 'Error generating token.' });
    }

    res.status(200).json(accessToken);
  } catch (error: unknown) {
    const errorMessage = process.env.NODE_ENV === 'development' ? ` ${error}` : '';
    res.status(500).json({ message: `Failed to refresh token.${errorMessage}` });
  }
};
