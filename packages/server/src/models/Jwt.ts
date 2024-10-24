import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import type {
  Jwt as JwtData,
  JwtOptions,
  JwtPayload,
  RefreshTokenPayload,
} from '@shared/types';

import { jwtPayload, jwtOptions, decodedJwt } from '@shared/schemas';

import * as models from '@db/models';

import { InternalServerError } from '@utils';

const secret = process.env.JWT_SECRET || 'pv-jwt-secret';

export abstract class Jwt {
  payload: JwtPayload;
  options: Partial<JwtOptions>;
  token: string | undefined;

  constructor(payload: JwtPayload) {
    this.payload = jwtPayload.parse(payload);
  }

  public value(): JwtData {
    return {
      token: this.toString(),
      payload: this.payload,
    };
  }

  public toString(): string {
    if (!this.token) {
      throw new Error('Token not generated.');
    }

    return this.token;
  }

  public [Symbol.toPrimitive](hint: string): string | undefined {
    if (hint === 'string') {
      return this.toString();
    }
  }

  public async generate(): Promise<this> {
    this.payload.expiresAt = new Date(
      Date.now() + this.options.expiresIn,
    ).toISOString();

    return this;
  }

  public generateToken(): string {
    // TODO: do this asynchronously

    const token = jwt.sign(this.payload, secret, this.options);

    if (token.length === 0) {
      throw new Error('Failed to generate token.');
    }

    return token;
  }

  public static async decode(token: string): Promise<RefreshTokenPayload> {
    if (token.length === 0) {
      throw new Error('Token not provided.');
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, { complete: false }, (err, decoded) => {
        if (err) {
          if (err instanceof TokenExpiredError) {
            return reject(
              new TokenExpiredError(
                'Session expired. Please login again.',
                err.expiredAt,
              ),
            );
          }
          return reject('Failed to verify token.');
        }
        return resolve(decodedJwt.parse(decoded));
      });
    });
  }

  public static async revokeToken(jti: string, userId: number): Promise<void> {
    let revokedToken = await models.RevokedToken.findByPk(jti);

    if (!revokedToken) {
      revokedToken = await models.RevokedToken.create({ jti, UserId: userId });

      if (!revokedToken) {
        throw new InternalServerError('Failed to revoke token.');
      }
    } else {
      throw new Error('Token already revoked.');
    }
  }
}

export class AccessToken extends Jwt {
  constructor(payload: JwtPayload) {
    super(payload);

    this.options = jwtOptions.parse({
      expiresIn: 30 * 60 * 1000,
    });
  }

  public async generate(): Promise<this> {
    super.generate();

    this.token = this.generateToken();

    return this;
  }
}

export class RefreshToken extends Jwt {
  constructor(payload: JwtPayload) {
    super(payload);

    this.options = jwtOptions.parse({
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });
  }

  private generateJti(): string {
    if (this.payload.jti) {
      throw new Error('Jti already generated.');
    }

    return (this.payload.token = uuidv4());
  }

  public async generate(): Promise<this> {
    super.generate();

    this.payload.jti = this.generateJti();

    this.token = this.generateToken();

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
