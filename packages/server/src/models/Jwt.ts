import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '@shared/types';

const jwtPayload = z.object({
  // Define the structure of your JWT payload here
});

const jwtOptions = z.object({
  // Define the structure of your JWT options here
});

export const jsonWebToken = z
  .object({
    token: z.string().optional().nullable(),
    expiresIn: z.number().optional().nullable(),
    payload: jwtPayload.optional().nullable(),
    options: jwtOptions.optional().nullable(),
  })
  .partial();

export type JsonWebToken = z.infer<typeof jsonWebToken>;

export class Jwt {
  protected _token?: string | null;
  expiresIn?: number | null;
  payload?: JwtPayload;
  options?: z.infer<typeof jwtOptions> | null;

  constructor(data: JsonWebToken) {
    const parsedData = jsonWebToken.parse(data);
    this._token = parsedData.token;
    this.expiresIn = parsedData.expiresIn;
    this.payload = parsedData.payload;
    this.options = parsedData.options;
  }

  get token(): string | null | undefined {
    return this._token;
  }

  value() {
    return {
      token: this._token as string,
      payload: this.payload as JwtPayload,
    };
  }
}

const secret = process.env.JWT_SECRET || 'secret';

export class AccessToken extends Jwt {
  expiresIn: number = Date.now() + 30 * 60 * 1000;

  constructor(data: JsonWebToken) {
    super(data);

    if (this.payload) {
      this._token = jwt.sign(this.payload, secret, {
        algorithm: 'HS256',
        expiresIn: this.expiresIn,
      });
    } else {
      throw new Error('Payload is required to generate a token');
    }
  }
}
