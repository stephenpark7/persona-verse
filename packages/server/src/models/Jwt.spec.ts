import type { JwtPayload } from '@shared/types';
import { ZodError } from 'zod';
import { AccessToken } from './Jwt';

describe('Jwt', () => {
  let payload: JwtPayload;

  beforeEach(() => {
    payload = { userId: 1, username: 'test' };
  });

  describe('Access token', () => {
    describe('Constructor', () => {
      it('throws an error when payload is missing', () => {
        payload = {} as JwtPayload;
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
      it('throws an error when token is not generated', () => {
        const jwt = new AccessToken(payload);
        expect(() => jwt.toString()).toThrowError('Token not generated.');
        expect(() => `${jwt}`).toThrowError('Token not generated.');
      });

      it('returns the token when generated', () => {
        const jwt = new AccessToken(payload);
        jwt.generate();
        expect(jwt.toString()).toEqual(jwt.token);
        expect(`${jwt}`).toEqual(jwt.token);
      });
    });

    describe('value()', () => {
      it('throws an error when token is not generated', () => {
        const jwt = new AccessToken(payload);
        expect(() => jwt.value()).toThrowError('Token not generated.');
      });

      it('returns the token and payload when generated', () => {
        const jwt = new AccessToken(payload);
        jwt.generate();
        expect(jwt.value()).toEqual({ token: jwt.toString(), payload });
      });
    });
  });
});
