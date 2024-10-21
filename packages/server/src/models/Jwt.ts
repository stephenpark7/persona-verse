import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import type {
  Jwt as JwtData,
  JwtOptions,
  JwtPayload,
  RefreshTokenPayload,
} from '@shared/types';
import { jwtPayload, jwtOptions, refreshTokenPayload } from '@shared/schemas';
import * as models from '@db/models';

const secret = process.env.JWT_SECRET || 'pv-jwt-secret';

export abstract class Jwt {
  payload: JwtPayload;
  options: Partial<JwtOptions>;
  token: string | undefined;

  constructor(payload: JwtPayload) {
    this.payload = jwtPayload.parse(payload);
  }

  async generate(): Promise<this> {
    const token = jwt.sign(this.payload, secret, this.options);

    if (token.length === 0) {
      throw new Error('Failed to generate token.');
    }

    this.token = token;

    return this;
  }

  toString(): string {
    if (!this.token) {
      throw new Error('Token not generated.');
    }

    return this.token;
  }

  [Symbol.toPrimitive](hint: string): string | undefined {
    if (hint === 'string') {
      return this.toString();
    }
  }

  value(): JwtData {
    return {
      token: this.toString(),
      payload: this.payload,
    };
  }

  expires(): number {
    return this.options.expiresIn;
  }

  static decode(token: string): RefreshTokenPayload {
    if (!token) {
      throw new Error('Token not provided.');
    }

    const decoded = jwt.verify(token, secret, {
      complete: false,
    });

    return refreshTokenPayload.parse(decoded);
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

  async generate(): Promise<this> {
    this.payload.jti = uuidv4();

    const token = jwt.sign(this.payload, secret, this.options);

    if (token.length === 0) {
      throw new Error('Failed to generate token.');
    }

    this.token = token;

    await models.User.findById(this.payload.userId);

    const refreshToken = await models.RefreshToken.create({
      jti: this.payload.jti,
      UserId: this.payload.userId,
    });

    if (!refreshToken) {
      throw new Error('Failed to generate token.');
    }

    return this;
  }
}
