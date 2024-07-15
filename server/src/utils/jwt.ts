import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { JWTPayload } from '../interfaces';
import { RevokedToken } from '../models';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function generateAccessToken(payload: JWTPayload) {
  const options = { expiresIn: '1h' };
  const expiresAt = Date.now() + 60 * 60 * 1000;
  return jwt.sign({ ...payload, expiresAt }, JWT_SECRET, options);
}

function generateRefreshToken(payload: JWTPayload) {
  const options = { expiresIn: '7d' };
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const jti = uuidv4();
  return jwt.sign({ ...payload, jti, expiresAt }, JWT_SECRET, options);
}

async function generateRevokedToken(userId: number) {
  return await RevokedToken.create({ UserId: userId });
}

function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export default {
  generateAccessToken,
  generateRefreshToken,
  generateRevokedToken,
  verifyToken,
};
