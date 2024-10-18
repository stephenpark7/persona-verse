import { Jwt } from './Jwt';

describe('Jwt', () => {
  it('should create a new instance of Jwt', () => {
    const token = 'mock_token';
    const expiresIn = Date.now() + 30 * 60 * 1000;
    const options = { expiresIn };
    const jwt = new Jwt({
      token,
      expiresIn,
      payload: {
        userId: 1,
        username: 'test',
      },
      options,
    });
    expect(jwt.token).toBe(token);
    expect(jwt.expiresIn).toBe(expiresIn);
  });
});
