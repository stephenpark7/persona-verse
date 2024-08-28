import { jwtFactory } from '@factories';
import { getDisplayName } from './user';

describe('getDisplayName', () => {
  test('returns the username from the JWT payload', () => {
    const jwt = jwtFactory();
    const result = getDisplayName(jwt);
    expect(result).toBe(jwt.payload.username);
  });
});
