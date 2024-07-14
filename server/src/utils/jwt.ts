import jwt from 'jsonwebtoken';
import { RefreshToken, RevokedToken } from '../models';
import { JWTPayload } from '../interfaces';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const secret = process.env.JWT_SECRET || 'secret';

function generateAccessToken(payload: object) {
  const options = { expiresIn: '1h' };
  const expiresAt = Date.now() + 60 * 60 * 1000;
  const token = jwt.sign(payload, secret, options);
  return { token: token, expiresAt: expiresAt } ;
}

async function generateRefreshToken(userId: number) {
  const options = { expiresIn: '7d' };
  const jti = uuidv4();
  // await RefreshToken.create({ jti, UserId: userId });
  const payload: JWTPayload = {
    jti: jti,
    userId: userId,
  }
  const token = jwt.sign(payload, secret, options);
  return token;
}

function decodeToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function generateRevokedToken(userId: number) {
  RevokedToken.create({ UserId: userId });
}

function getUserFromToken(token: string) {
  const decodedToken: JWTPayload = jwt.decode(token) as JWTPayload;
  return decodedToken.userId;
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateRevokedToken,
  decodeToken,
};
