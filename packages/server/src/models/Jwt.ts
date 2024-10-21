import jwt from 'jsonwebtoken';
import { jwtPayload } from '@shared/schemas';
import { JwtOptions } from '@shared/types';
import { JwtPayload } from 'jsonwebtoken';

abstract class Jwt {
  payload: JwtPayload;
  options: Partial<JwtOptions>;
  token: string | null = null;

  constructor(payload: JwtPayload) {
    this.payload = jwtPayload.parse(payload);
    this.setup();
  }

  abstract setup(): void;

  generate() {
    this.token = jwt.sign(
      this.payload,
      process.env.JWT_SECRET || 'pv-jwt-secret',
      this.options,
    );
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
    return this.options.expiresIn;
  }
}

export class AccessToken extends Jwt {
  setup(): void {
    this.options = {
      expiresIn: 30 * 60 * 1000,
    };
  }
}

export class RefreshToken extends Jwt {
  setup(): void {
    this.options = {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    };
  }
}
