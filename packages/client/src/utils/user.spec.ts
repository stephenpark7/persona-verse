import { jwtFactory } from '@tests/factories';
import { getDisplayName } from './user';

describe('getDisplayName', () => {
  test('returns the username from the JWT payload', () => {
    const jwt = jwtFactory();
    expect(getDisplayName(jwt)).toBe(jwt.payload.username);
  });

  test('throws an error if the JWT is null', () => {
    const error = [
      {
        code: 'invalid_type',
        expected: 'object',
        received: 'null',
        path: [],
        message: 'Expected object, received null',
      },
    ];
    const jwt = null;
    expect(() => {
      getDisplayName(jwt);
    }).toThrow(JSON.stringify(error, null, 2));
  });
});
