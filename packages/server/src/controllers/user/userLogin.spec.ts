// TODO: init models in a better way
// 1) Init sequelize instance
// 2) Init models
// 3) Associate models
// 4) Sync models

import { sequelize } from '@db';
import type { AuthenticatedRequest } from '@shared/types';
import { userCreate, userLogin } from '../user';
import { User } from '@models';

describe('userLogin', async () => {
  beforeAll(async () => {
    // if (User.findByPk(1) == null) {
    // await userCreate({
    //   username: 'test',
    //   email: 'test@test.com',
    //   password: 'Password123!',
    // });
    // }
  });

  describe('when body is missing', () => {
    it('throws an error', async () => {
      const req = {
        session: {
          refreshToken: '',
        },
      } as AuthenticatedRequest;
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
      const req = {
        session: {
          refreshToken: '',
        },
      } as AuthenticatedRequest;
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
      const req = {
        session: {
          refreshToken: '',
        },
      } as AuthenticatedRequest;
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
    it('logs in a user', async () => {
      await userCreate({
        username: 'test',
        email: 'test@test.com',
        password: 'Password123!',
      });

      const req = {
        session: {
          refreshToken: '',
        },
      } as AuthenticatedRequest;
      console.log(User.findAll());
      const res = await userLogin(
        {
          username: 'test',
          password: 'Password123!',
        },
        req,
      );
      expect(res).toHaveProperty('message', 'Logged in successfully.');
    });
  });
});
