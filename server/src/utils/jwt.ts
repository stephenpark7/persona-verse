import jwt from 'jsonwebtoken';
import { RevokedToken } from '../models';

const secret = process.env.JWT_SECRET || 'secret';

function generateAccessToken(payload: any) {
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secret, options);
  return token;
}

function generateRefreshToken(payload: any) {
  const options = { expiresIn: '7d' };
  const token = jwt.sign(payload, secret, options);
  return token;
}

function generateRevokedToken(userId: number) {
  RevokedToken.create({ UserId: userId });
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateRevokedToken,
};
