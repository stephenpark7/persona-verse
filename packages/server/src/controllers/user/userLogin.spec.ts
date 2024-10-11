import type { AuthenticatedRequest } from '@shared/types';
import { authenticatedRequestFactory } from '@tests/factories';
import { LoginResponse, userCreate, userLogin } from '../user';

describe('userLogin', () => {
  let req: AuthenticatedRequest;

  beforeEach(() => {
    req = authenticatedRequestFactory({
      session: {
        refreshToken: '',
      },
    });
  });

  describe('when body is missing', () => {
    it('throws an error', async () => {
      await expect(() =>
        userLogin(
          {
            username: '',
            password: '',
          },
          req,
        ),
      ).rejects.toThrow('Missing field(s).');
    });
  });

  describe('when username is invalid', () => {
    it('throws an error', async () => {
      await expect(() =>
        userLogin(
          {
            username: '$',
            password: 'password',
          },
          req,
        ),
      ).rejects.toThrow('Invalid credentials.');
    });
  });

  describe('when password is invalid', () => {
    it('throws an error', async () => {
      await expect(() =>
        userLogin(
          {
            username: 'test',
            password: 'password',
          },
          req,
        ),
      ).rejects.toThrow('Invalid credentials.');
    });
  });

  describe('when body is valid', () => {
    let res: LoginResponse;

    beforeEach(async () => {
      await userCreate({
        username: 'test',
        email: 'test@test.com',
        password: 'Password123!',
      });

      req = authenticatedRequestFactory({
        session: {
          refreshToken: '',
        },
      });

      res = await userLogin(
        {
          username: 'test',
          password: 'Password123!',
        },
        req,
      );
    });

    it('logs in a user', async () => {
      expect(res).toHaveProperty('message', 'Logged in successfully.');
    });
  });
});
