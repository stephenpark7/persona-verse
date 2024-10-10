import { userCreate } from '../user';

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
    // describe('when username is invalid', () => {
    //   it('throws an error', async () => {
    //     const req = {
    //       username: '$',
    //       email: 'test',
    //       password: 'password',
    //     };
    //     await expect(() => userCreate(req)).rejects.toThrow(
    //       'Invalid username.',
    //     );
    //   });
    // });
    // describe('when email is invalid', () => {
    //   it('throws an error', async () => {
    //     const req = {
    //       username: 'test',
    //       email: 'test',
    //       password: 'password',
    //     };
    //     await expect(() => userCreate(req)).rejects.toThrow(
    //       'Invalid email address.',
    //     );
    //   });
    // });
    // describe('when password is invalid', () => {
    //   it('throws an error', async () => {
    //     const req = {
    //       username: 'test',
    //       email: 'test@test.com',
    //       password: 'password',
    //     };
    //     await expect(() => userCreate(req)).rejects.toThrow(
    //       'Invalid password. Please enter a password that is at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.',
    //     );
    //   });
    // });
    // describe('when body is valid', () => {
    //   it('creates a new user', async () => {
    //     const req = {
    //       username: 'test',
    //       email: 'test@test.com',
    //       password: 'Password123!',
    //     };
    //     const res = await userCreate(req);
    //     expect(res).toHaveProperty('message', 'User created successfully.');
    //   });
    // });
  });
});
