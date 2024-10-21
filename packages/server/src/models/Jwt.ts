import jwt from 'jsonwebtoken';
import type { JwtOptions, JwtPayload } from '@shared/types';
import { jwtPayload, jwtOptions } from '@shared/schemas';

const secret = process.env.JWT_SECRET || 'pv-jwt-secret';

export abstract class Jwt {
  payload: JwtPayload;
  options: Partial<JwtOptions>;
  token: string | null = null;

  constructor(payload: JwtPayload) {
    this.payload = jwtPayload.parse(payload);
  }

  generate() {
    this.token = jwt.sign(this.payload, secret, this.options);
  }

  toString(): string {
    return this.token as string;
  }

  [Symbol.toPrimitive](hint: string): string | undefined {
    if (hint === 'string') {
      return this.toString() as string;
    }
  }

  value(): { token: string; payload: JwtPayload } {
    return {
      token: this.toString() as string,
      payload: this.payload,
    };
  }

  expires(): number {
    return this.payload.exp || 0;
  }

  static decode(token: string): JwtPayload {
    const decoded = jwt.verify(token, secret, {
      complete: false,
    });

    return jwtPayload.parse(decoded);
  }
}

export class AccessToken extends Jwt {
  constructor(payload: JwtPayload) {
    super(payload);

    this.options = jwtOptions.parse({
      expiresIn: 30 * 60 * 1000,
    });
  }
}

export class RefreshToken extends Jwt {
  constructor(payload: JwtPayload) {
    super(payload);

    this.options = jwtOptions.parse({
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
