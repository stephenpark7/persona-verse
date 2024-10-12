import type { RefreshToken, RefreshTokenResponse } from '@shared/types';
import {
  refreshTokenFactory,
  userFactory,
  requestFactory,
} from '@tests/factories';
import { refreshJwt } from './refresh';

describe('Refresh Controller', () => {
  describe('refreshJwt', () => {
    let refreshToken: RefreshToken;
    let res: RefreshTokenResponse;

    describe('when the refresh token is valid', () => {
      beforeEach(async () => {
        const user = await userFactory();

        refreshToken = refreshTokenFactory({
          userId: user.id,
          username: user.username,
        });
      });

      it('returns a new access token', async () => {
        res = await refreshJwt(
          requestFactory({
            session: {
              refreshToken,
            },
          }),
        );
        expect(res).toHaveProperty('message', 'Token refreshed.');
        expect(res).toHaveProperty('jwt');
        expect(res.jwt.expiresAt).toBeGreaterThan(Date.now());
        expect(res.jwt.payload.userId).toEqual(refreshToken.payload.userId);
        expect(res.jwt.payload.username).toEqual(refreshToken.payload.username);
        expect(res.jwt.payload.jti).not.toEqual(refreshToken.payload.jti);
      });
    });

    describe('when the refresh token is invalid', () => {
      beforeEach(async () => {
        refreshToken = refreshTokenFactory({
          userId: -1,
          username: 'invalid',
        });
      });

      it('throws an error', async () => {
        await expect(() =>
          refreshJwt(
            requestFactory({
              session: {
                refreshToken,
              },
            }),
          ),
        ).rejects.toThrow('Session expired. Please login again.');
      });

      // TODO: add tests for specific error messages
    });
  });
});
