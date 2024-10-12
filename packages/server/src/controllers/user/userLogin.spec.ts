import type { AuthenticatedRequest, UserLoginParams } from '@shared/types';
import { authenticatedRequestFactory } from '@tests/factories';
import { LoginResponse, userLogin } from './user';
import { userCreate } from '../user/userCreate';

describe('userLogin', async () => {
  let req: AuthenticatedRequest;
  let params: UserLoginParams;
  let res: () => Promise<LoginResponse>;

  beforeAll(async () => {
    params = {
      username: '',
      password: '',
    };

    req = authenticatedRequestFactory({
      session: {
        refreshToken: '',
      },
    });

    res = () => userLogin(params, req);
  });

  describe('when body is missing', () => {
    it('throws an error', async () => {
      await expect(res).rejects.toThrow('Missing field(s).');
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

  describe('when body is valid', async () => {
    let res: LoginResponse;

    beforeAll(async () => {
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
