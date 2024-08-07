import { Request, Response } from 'express';
import { JWTPayload } from '../interfaces';
import { sendUnauthorizedResponse } from '../utils/request';
import { generateAccessToken, verifyToken } from '../utils/jwt';
import { db } from '../db';

const { User, RevokedToken } = db.models;

const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.session as JWTPayload;

    if (!refreshToken) {
      return sendUnauthorizedResponse(res, 'Session expired. Please login again.', 401);
    }

    const { jti, userId } = verifyToken(refreshToken.token);

    if (!jti) {
      return sendUnauthorizedResponse(res, 'Token does not have a jti.', 401);
    }

    if (userId === undefined || userId === null) {
      return sendUnauthorizedResponse(res, 'Token does not have a userId.', 401);
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return sendUnauthorizedResponse(res, 'User not found.', 401);
    }

    if (await RevokedToken.findByPk(jti)) {
      return sendUnauthorizedResponse(res, 'Refresh token is revoked.', 401);
    }

    const payload = {
      userId: parseInt(user.get('id') as string),
      username: user.get('username') as string,
    };

    const accessToken = generateAccessToken(payload);

    if (!accessToken) {
      return sendUnauthorizedResponse(res, 'Failed to generate access token.', 400);
    }

    res.status(200).json({
      message: 'Token refreshed.',
      jwt: accessToken,
    });
  } catch (error: unknown) {
    return sendUnauthorizedResponse(res, 'Session expired. Please login again.', 400);
  }
};

export { refresh };
