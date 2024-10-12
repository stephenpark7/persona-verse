import { RegisterFormFields, RegisterResponse } from '@schemas';
import { userCreate } from './userCreate';

describe('userCreate', () => {
  describe('when body is valid', async () => {
    let params: RegisterFormFields;
    let res: RegisterResponse;

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

  describe('when body is missing', () => {
    let params: RegisterFormFields;

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
    let params: RegisterFormFields;

    beforeEach(() => {
      params = {
        username: '$',
        email: 'test',
        password: 'password',
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
        password: 'password',
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
});
