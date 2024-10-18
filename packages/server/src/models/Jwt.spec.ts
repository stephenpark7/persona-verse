import { ZodError } from 'zod';
import { Jwt } from './Jwt';

describe('Jwt', () => {
  describe('Access token', () => {
    describe('Constructor', () => {
      it('should throw an error when payload is missing', () => {
        const payload = {};
        const createJwt = () => new Jwt(payload);
        expect(createJwt).toThrowError(ZodError);
      });
    });
  });
});
