import jwt, { TokenExpiredError } from 'jsonwebtoken';
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

// TODO: jwt needs to expire

export abstract class Jwt {
  payload: JwtPayload;
  options: Partial<JwtOptions>;
  token: string | undefined;

  constructor(payload: JwtPayload) {
    this.payload = jwtPayload.parse(payload);
  }

  appendDataToPayload(records: Record<string, string>): this {
    this.payload = {
      ...this.payload,
      ...records,
    };

    return this;
  }

  public async generate(): Promise<this> {
    this.appendDataToPayload({
      expiresAt: new Date(Date.now() + this.options.expiresIn).toISOString(),
    });

    const token = jwt.sign(this.payload, secret, this.options);

    if (token.length === 0) {
      throw new Error('Failed to generate token.');
    }

    this.token = token;

    return this;
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

  public value(): JwtData {
    return {
      token: this.toString(),
      payload: this.payload,
    };
  }

  public expires(): number {
    return this.options.expiresIn;
  }

  public static async decode(token: string): Promise<RefreshTokenPayload> {
    if (!token) {
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
        return resolve(refreshTokenPayload.parse(decoded));
      });
    });
  }

  public static async revokeToken(jti: string, userId: number): Promise<void> {
    const revokedToken = await models.RevokedToken.findByPk(jti);

    if (!revokedToken) {
      await models.RevokedToken.create({ jti, UserId: userId });
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
