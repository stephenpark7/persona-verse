import type { RefreshToken, RefreshTokenResponse } from '@shared/types';
import type { Request } from 'express';
import {
  refreshTokenFactory,
  userFactory,
  requestFactory,
} from '@tests/factories';
import { refreshJwt } from './refresh';

describe('Refresh Controller', async () => {
  describe('refreshJwt', async () => {
    let refreshToken: RefreshToken;
    let res: RefreshTokenResponse;
    let req: Request;

    describe('when the refresh token is valid', async () => {
      beforeEach(async () => {
        const user = await userFactory();

        refreshToken = await refreshTokenFactory({
          userId: user.id,
          username: user.username,
        });

        req = requestFactory({
          session: {
            refreshToken,
          },
        });

        res = await refreshJwt(req);
      });

      it('returns a message and jwt', async () => {
        expect(res).toHaveProperty('message', 'Token refreshed.');
        expect(res).toHaveProperty('jwt');
      });

      it('returns a jwt with the correct payload', async () => {
        expect(res.jwt.payload.expiresAt).toBeDefined();
        expect(res.jwt.payload.userId).toEqual(refreshToken.payload.userId);
        expect(res.jwt.payload.username).toEqual(refreshToken.payload.username);
        expect(res.jwt.payload.jti).toBeDefined();
      });
    });

    describe('when the refresh token is invalid', async () => {
      describe('when user is not found', async () => {
        it('throws an error', async () => {
          await expect(
            async () =>
              await refreshTokenFactory({
                userId: -1,
                username: 'invalid',
              }),
          ).rejects.toThrow('User not found.');
        });
      });
    });
  });
});
