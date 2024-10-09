import { AuthenticatedRequest } from '@shared/types';
import { userCreate, userLogin } from './user';

describe('User Controller', () => {
  describe('userCreate', () => {
    describe('when body is missing', () => {
      it('throws an error', async () => {
        const req = {
          username: '',
          email: '',
          password: '',
        };
        await expect(() => userCreate(req)).rejects.toThrow(
          'Missing field(s).',
        );
      });
    });
    describe('when username is invalid', () => {
      it('throws an error', async () => {
        const req = {
          username: '$',
          email: 'test',
          password: 'password',
        };
        await expect(() => userCreate(req)).rejects.toThrow(
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
    describe('when body is valid', () => {
      it('creates a new user', async () => {
        const req = {
          username: 'test',
          email: 'test@test.com',
          password: 'Password123!',
        };
        const res = await userCreate(req);
        expect(res).toHaveProperty('message', 'User created successfully.');
      });
    });
  });

  describe('userLogin', () => {
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
        ).rejects.toThrow('Invalid username/password.');
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
        const req = {
          session: {
            refreshToken: '',
          },
        } as AuthenticatedRequest;
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
});
