import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { jwtPayload } from '@shared/schemas';
import { JwtPayload } from '@shared/types';

export const jsonWebToken = z.object({
  type: z.union([z.literal('Access'), z.literal('Refresh')]),
  token: z.string(),
  expiresIn: z.string(),
  expiresAt: z.number(),
  payload: jwtPayload,
});

export type JsonWebToken = z.infer<typeof jsonWebToken>;

export class Jwt {
  type: 'Access' | 'Refresh';
  token: string;
  expiresIn: string;
  expiresAt: number;
  payload: JwtPayload;

  constructor(data: JsonWebToken) {
    const parsedData = jsonWebToken.parse(data);
    this.type = parsedData.type;
    this.token = parsedData.token;
    this.expiresIn = parsedData.expiresIn;
    this.expiresAt = parsedData.expiresAt;
    this.payload = parsedData.payload;
  }
}

export class AccessToken extends Jwt {
  constructor(data: JsonWebToken) {
    super(data);

    if (this.type !== 'Access') {
      throw new Error('Invalid token type.');
    }

    const expiresAt = Date.now() + 30 * 60 * 1000;

    // TODO: refactor to use expiresAt only or expiresIn only, not both

    const token = jwt.sign(
      { ...this.payload, expiresAt },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30m' },
    );

    if (!token) {
      throw new Error(
        'Internal server error occurred while generating access token.',
      );
    }

    this.token = token;
    this.expiresAt = expiresAt;
  }
}
