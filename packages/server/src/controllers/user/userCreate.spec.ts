import type { UserCreateParams, UserCreateResponse } from '@shared/types';
import { userCreate } from './userCreate';

describe('userCreate', () => {
  let params: UserCreateParams;

  describe('when body is missing', () => {
    beforeEach(() => {
      params = {
        username: '',
        email: '',
        password: '',
      };
    });

    it('throws an error', async () => {
      await expect(() => userCreate(params)).rejects.toThrow(
        'Missing field(s).',
      );
    });
  });

  describe('when username is invalid', () => {
    beforeEach(() => {
      params = {
        username: '$',
        email: 'test@test.com',
        password: 'Password123!',
      };
    });

    it('throws an error', async () => {
      await expect(() => userCreate(params)).rejects.toThrow(
        'Invalid username.',
      );
    });
  });

  describe('when email is invalid', () => {
    it('throws an error', async () => {
      const req = {
        username: 'test',
        email: 'test',
        password: 'Password123!',
      };

      await expect(() => userCreate(req)).rejects.toThrow(
        'Invalid email address.',
      );
    });
  });

  describe('when password is invalid', () => {
    it('throws an error', async () => {
      const req = {
        username: 'test',
        email: 'test@test.com',
        password: 'password',
      };

      await expect(() => userCreate(req)).rejects.toThrow(
        'Invalid password. Please enter a password that is at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.',
      );
    });
  });

  describe('when body is valid', async () => {
    let res: UserCreateResponse;

    beforeAll(async () => {
      params = {
        username: 'test',
        email: 'test@test.com',
        password: 'Password123!',
      };

      res = await userCreate(params);
    });

    it('creates a new user', async () => {
      expect(res).toHaveProperty('message', 'User created successfully.');
    });
  });
});
