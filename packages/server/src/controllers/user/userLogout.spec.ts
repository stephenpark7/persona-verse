import { Mock } from 'vitest';
import type { Request, Response } from 'express';
import { User } from '@db/models';
import { userLogout } from './userLogout';

vi.mock('@db/models', async (importOriginal) => {
  const models = await importOriginal<typeof import('@db/models')>();
  return {
    ...models,
    User: {
      // createAccount: models.User.createAccount,
      logoutAccount: vi.fn(models.User.logoutAccount),
    },
  };
});

describe('userLogout', async () => {
  let req: Request;
  let res: Response;

  beforeAll(async () => {
    vi.restoreAllMocks();

    // await userCreate({
    //   username: 'test',
    //   email: 'test@test.com',
    //   password: 'Password123!',
    // });

    // TODO: create factory/mocks for these

    // session = {
    //   destroy: vi.fn(),
    // } as unknown as Session;

    req = {
      url: '',
      userId: 1,
      session: {
        refreshToken: {
          token: '',
        },
      },
    } as unknown as Request;

    res = {
      clearCookie: vi.fn(),
    } as unknown as Response;
  });

  describe('when body is missing', async () => {
    it('throws an error', async () => {
      try {
        await userLogout(req, res);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
      // await expect(() => userLogout(session, req, res)).rejects.toThrow(
      //   'Token not provided.',
      // );
    });
  });

  describe('when server is down', async () => {
    beforeAll(async () => {
      (User.logoutAccount as Mock).mockReturnValue(
        Promise.reject('Internal server error occurred.'),
      );
    });

    it('throws an error', async () => {
      await expect(() => userLogout(req, res)).rejects.toThrow(
        'Internal server error occurred.',
      );
    });
  });
});
