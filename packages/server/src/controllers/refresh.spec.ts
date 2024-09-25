import type { Request } from 'express';
import { refreshJwt } from './refresh';
import { generateRefreshToken } from '@utils';
import { userFactory } from '../factories';
import { User } from '@models';
import { sequelize } from '@db/sequelize';

// TODO: move beforeAll and afterAll to a global setup file

describe('Refresh Controller', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should return a new access token', async () => {
    const user = await User.create(userFactory());

    const token = generateRefreshToken({
      userId: user.getDataValue('id'),
      username: user.getDataValue('username'),
      // expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      // jti: 'test-jti',
    });

    const req = {
      session: {
        refreshToken: token,
      },
    } as Request;

    const result = await refreshJwt(req);

    expect(result).toHaveProperty('message', 'Token refreshed.');
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();
  });
});
