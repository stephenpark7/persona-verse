import { z } from 'zod';
import jwt, { Algorithm } from 'jsonwebtoken';
import { JwtOptions, JwtPayload } from '@shared/types';
import { jwtPayload, jwtOptions } from '@shared/schemas';

export const jsonWebToken = z.object({
  payload: jwtPayload,
  token: z.string(),
  options: jwtOptions,
});

export type JsonWebToken = z.infer<typeof jsonWebToken>;

export class Jwt {
  protected algorithm: Algorithm = 'HS256';

  protected token: string | null;
  protected payload: JwtPayload;
  protected options: JwtOptions;

  constructor(payload: JwtPayload) {
    this.payload = jwtPayload.parse(payload);
    this.options = jwtOptions.parse({
      algorithm: 'HS256',
      expiresIn: 30 * 60 * 1000,
    });
    this.token = jwt.sign(
      this.payload,
      process.env.JWT_SECRET || 'secret',
      this.options,
    );
  }

  value() {
    return {
      token: this.token as string,
      payload: this.payload as JwtPayload,
    };
  }

  toString() {
    return this.token as string;
  }

  [Symbol.toPrimitive](hint: string) {
    if (hint === 'string') {
      return this.token as string;
    }
  }
}

export class AccessToken extends Jwt {
  expiresIn: number = Date.now() + 30 * 60 * 1000;
}

export class RefreshToken extends Jwt {
  expiresIn: number = Date.now() + 7 * 24 * 60 * 60 * 1000;

  constructor(payload: JwtPayload) {
    super(payload);

    this.options = {
      expiresIn: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
  }

  // constructor(data: JsonWebToken) {
  //   super(data);

  //   // TODO:
  //   // 1) Generate jti
  //   // 2) Save jti to database
  // }
}
