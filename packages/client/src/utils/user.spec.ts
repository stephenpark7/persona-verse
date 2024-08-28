import { jwtFactory } from '@factories';
import { getDisplayName } from './user';

describe('getDisplayName', () => {
  test('returns the username from the JWT payload', () => {
    const jwt = jwtFactory();
    expect(getDisplayName(jwt)).toBe(jwt.payload.username);
  });
});
