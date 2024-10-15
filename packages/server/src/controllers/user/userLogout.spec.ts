import type { Session } from 'express-session';
import type { Response } from 'express';
import type { AuthenticatedRequest } from '@shared/types';
import { userCreate } from './userCreate';
import { userLogout } from './userLogout';

describe('userLogout', async () => {
  let session: Session;
  let req: AuthenticatedRequest;
  let res: Response;

  beforeAll(async () => {
    await userCreate({
      username: 'test',
      email: 'test@test.com',
      password: 'Password123!',
    });

    // TODO: create factory/mocks for these

    session = {
      destroy: vi.fn(),
    } as unknown as Session;

    req = {
      url: '',
      userId: 1,
      session: {
        refreshToken: {
          token: '',
        },
      },
    } as unknown as AuthenticatedRequest;

    res = {
      clearCookie: vi.fn(),
    } as unknown as Response;
  });

  describe('when body is missing', () => {
    it('throws an error', async () => {
      await expect(() => userLogout(session, req, res)).rejects.toThrow(
        'jwt must be provided',
      );
    });
  });
});
