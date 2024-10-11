import { z } from 'zod';
import { userCreate } from '../user';

// TOOD: wip more than 1 test breaks
// look into how vitest works with async functions / concurrency
// because it seems to be running tests concurrently
// as a result, the database is being shared between tests
// and the tests are failing

// TODO: use shared package for this
const registerFormFields = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

type RegisterFormFields = z.infer<typeof registerFormFields>;

describe('userCreate', () => {
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
});
describe('when username is invalid', () => {
  it.skip('throws an error', async () => {
    const req = {
      username: '$',
      email: 'test',
      password: 'password',
    };
    await expect(() => userCreate(req)).rejects.toThrow('Invalid username.');
  });
});
describe.skip('when email is invalid', () => {
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
describe.skip('when password is invalid', () => {
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
describe.skip('when body is valid', () => {
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
