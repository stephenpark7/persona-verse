import { z } from 'zod';
import jwt, { Algorithm } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import * as models from '@db/models';

const jwtPayload = z.object({
  userId: z.number(),
  username: z.string(),
  jti: z.string().optional(),
});

const jwtOptions = z.object({
  algorithm: z.custom<Algorithm>(),
  expiresIn: z.number().optional(),
});

type JwtPayload = z.infer<typeof jwtPayload>;
type JwtOptions = z.infer<typeof jwtOptions>;

export class Jwt {
  payload: JwtPayload;
  options: JwtOptions;
  token: string | null = null;

  constructor(payload: JwtPayload, options: Partial<JwtOptions> = {}) {
    this.payload = jwtPayload.parse(payload);

    this.options = jwtOptions.parse({
      algorithm: 'HS256',
      ...options,
    });

    this.generate();
  }

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
}

export class AccessToken extends Jwt {
  constructor(payload: JwtPayload) {
    const options = {
      expiresIn: Date.now() + 30 * 60 * 1000,
    };
    super(payload, options);
  }
}

export class RefreshToken extends Jwt {
  constructor(payload: JwtPayload) {
    const options = {
      expiresIn: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    super(payload, options);

    const jti = uuidv4();

    this.payload = jwtPayload.parse({
      ...this.payload,
      jti,
    });
  }

  async generate() {
    super.generate();

    try {
      const user = await models.User.findByPk(this.payload.userId);
      if (!user) {
        throw new Error('User does not exist.');
      }

      const refreshTokenInstance = await models.RefreshToken.create({
        jti: this.payload.jti,
        UserId: this.payload.userId,
      });

      if (!refreshTokenInstance) {
        throw new Error(
          'Internal server error occurred while generating refresh token.',
        );
      }
    } catch {
      throw new Error(
        'Internal server error occurred while generating refresh token.',
      );
    }
  }
}
