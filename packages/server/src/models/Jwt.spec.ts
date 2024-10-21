import type { JwtPayload } from '@shared/types';
import { ZodError } from 'zod';
import { AccessToken } from './Jwt';

describe('Jwt', () => {
  let payload: JwtPayload;

  describe('Access token', () => {
    describe('Constructor', () => {
      beforeEach(() => {
        payload = { userId: 1, username: 'test' };
      });

      it('throws an error when payload is missing', () => {
        payload = {};
        const createJwt = () => new AccessToken(payload);
        expect(createJwt).toThrowError(ZodError);
      });

      it('creates a new access token when payload is valid', () => {
        const jwt = new AccessToken(payload);
        expect(jwt).toHaveProperty('token');
        expect(jwt).toHaveProperty('payload', payload);
      });
    });

    describe('toString() and Symbol.toPrimitive', () => {
      beforeEach(() => {
        payload = { userId: 1, username: 'test' };
      });

      it('returns the token and payload', () => {
        const jwt = new AccessToken(payload);
        expect(jwt.toString()).toBeDefined();
        expect(`${jwt}`).toBeDefined();
      });
    });

    describe('value()', () => {
      beforeEach(() => {
        payload = { userId: 1, username: 'test' };
      });

      it('returns the token and payload', () => {
        const jwt = new AccessToken(payload);
        expect(jwt.value()).toEqual({ token: jwt.toString(), payload });
        expect(jwt.expires()).toBeDefined();
      });
    });
  });
});
