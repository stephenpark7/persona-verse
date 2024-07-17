import { Request, Response } from 'express';
import JWT from '../utils/jwt';
import { RevokedToken, User } from '../models';
import { JWTPayload } from '../interfaces';

export const refresh = async (req: Request, res: Response) => {
  try {
    const { session } = req;
    const { refreshToken } = session as JWTPayload;
  
    if (!refreshToken) {
      return res.status(500).json({ message: 'Session not found.' });
    }

    const { jti, userId } = JWT.verifyToken(refreshToken.token);

    if (!jti) {
      return res.status(401).json({ message: 'Token does not have a jti.' });
    }

    if (userId === undefined || userId === null) {
      return res.status(401).json({ message: 'Token does not have a userId.' });
    }

    const user = await User.findByPk(userId);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (await RevokedToken.findByPk(jti)) {
      return res.status(400).json({ message: 'Token already revoked.' });
    }

    const payload = {
      userId: user.getId(),
      username: user.getUsername(),
    };

    const accessToken = JWT.generateAccessToken(payload);

    if (!accessToken) {
      return res.status(500).json({ message: 'Error generating token.' });
    }

    res.status(200).json(accessToken);
  } catch (error: unknown) {
    const errorMessage = process.env.NODE_ENV === 'development' ? ` ${error}` : '';
    res.status(500).json({ message: `Failed to refresh token.${errorMessage}` });
  }
};
