import type { Jwt, JwtPayload } from '@shared/types';
import { ZodError } from 'zod';
import { AccessToken } from './Jwt';

describe('Jwt', () => {
  let payload: JwtPayload;
  let jwt: AccessToken;

  beforeEach(() => {
    payload = { userId: 1, username: 'test' };
  });

  describe('Access token', () => {
    describe('Constructor', () => {
      describe('when payload is missing', () => {
        beforeEach(() => {
          payload = {};
        });

        it('throws an error', () => {
          const createJwt = () => new AccessToken(payload);
          expect(createJwt).toThrowError(ZodError);
        });
      });

      describe('when payload is valid', () => {
        beforeEach(() => {
          jwt = new AccessToken(payload);
        });

        it('creates a new access token when payload is valid', () => {
          expect(jwt).toHaveProperty('token');
          expect(jwt).toHaveProperty('payload', payload);
        });
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
      describe('when token is not generated', () => {
        beforeEach(() => {
          jwt = new AccessToken(payload);
        });

        it('throws an error', () => {
          expect(() => jwt.value()).toThrowError('Token not generated.');
        });
      });

      describe('when token is generated', () => {
        let jwtData: Jwt;

        beforeEach(() => {
          jwt.generate();
          jwtData = jwt.value();
        });

        it('returns the token and payload', () => {
          expect(jwtData).toHaveProperty('token', jwt.token);
          expect(jwtData).toHaveProperty('payload');
        });

        it('includes userId in the payload', () => {
          expect(jwtData.payload.userId).toEqual(payload.userId);
        });

        it('includes username in the payload', () => {
          expect(jwtData.payload.username).toEqual(payload.username);
        });

        it('does not include jti in the payload', () => {
          expect(jwtData.payload.jti).toBeUndefined();
        });

        it('adds expiresAt to the payload', () => {
          expect(jwtData.payload.expiresAt).toBeDefined();
        });
      });
    });
  });
});
