import type { Request } from 'express';
import { refreshJwt } from './refresh';
import {
  // jwtPayloadFactory,
  refreshTokenFactory,
  userFactory,
} from '../factories';

describe('Refresh Controller', () => {
  it('should return a new access token', async () => {
    const { id, username } = await userFactory();

    // const jwtPayload = jwtPayloadFactory({
    //   userId: id,
    //   username: username,
    // });

    const token = refreshTokenFactory({
      userId: id,
      username,
    });

    // TODO: create requestFactory
    const req = {
      session: {
        refreshToken: token,
      },
    } as Request;

    const result = await refreshJwt(req);

    expect(result).toHaveProperty('message', 'Token refreshed.');

    expect(result.jwt.token).not.toEqual(token.token);
    expect(result.jwt.expiresAt).toBeGreaterThan(Date.now());
    expect(result.jwt.payload.userId).toEqual(token.payload.userId);
    expect(result.jwt.payload.username).toEqual(token.payload.username);
    expect(result.jwt.payload.jti).not.toEqual(token.payload.jti);
  });
});
