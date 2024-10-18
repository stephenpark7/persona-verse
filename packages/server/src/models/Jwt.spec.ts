import type { JwtPayload } from '@shared/types';
import { ZodError } from 'zod';
import { Jwt } from './Jwt';

describe('Jwt', () => {
  let payload: JwtPayload;

  describe('Access token', () => {
    describe('Constructor', () => {
      beforeEach(() => {
        payload = { userId: 1, username: 'test' };
      });

      it('throws an error when payload is missing', () => {
        payload = {};
        const createJwt = () => new Jwt(payload);
        expect(createJwt).toThrowError(ZodError);
      });

      it('creates a new access token when payload is valid', () => {
        const jwt = new Jwt(payload);
        expect(jwt).toHaveProperty('token');
        expect(jwt).toHaveProperty('payload', payload);
      });
    });

    describe('toString() and Symbol.toPrimitive', () => {
      beforeEach(() => {
        payload = { userId: 1, username: 'test' };
      });

      it('returns the token and payload', () => {
        const jwt = new Jwt(payload);
        expect(jwt.toString()).toBeDefined();
        expect(`${jwt}`).toBeDefined();
      });
    });
  });
});
