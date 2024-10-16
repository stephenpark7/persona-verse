import { Jwt } from './Jwt';

describe('Jwt', () => {
  it('should create a new instance of Jwt', () => {
    const token = 'mock_token';
    const expiresIn = '30min';
    const jwt = new Jwt({
      type: 'Access',
      token,
      expiresIn,
      expiresAt: 123456,
      payload: {
        userId: 1,
        username: 'test',
        jti: 'mock jti',
      },
    });
    expect(jwt.token).toBe(token);
    expect(jwt.expiresIn).toBe(expiresIn);
  });
});
