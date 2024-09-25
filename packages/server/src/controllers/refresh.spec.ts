import type { Request } from 'express';
import { refreshJwt } from './refresh';
import { generateRefreshToken } from '@utils';

describe('Refresh Controller', () => {
  it('should return a new access token', async () => {
    // TODO: create factory for users

    const token = generateRefreshToken({
      userId: 1,
      username: 'test',
    });

    const req = {
      session: {
        refreshToken: token,
      },
    } as Request;

    const result = await refreshJwt(req);

    console.log(result);
  });
});
