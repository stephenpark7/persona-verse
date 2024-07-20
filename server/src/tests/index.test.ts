import request from 'supertest';
import app from '../app';
import { sequelize, setupDB } from '../db';

describe('POST /api/users/signup', () => {
  beforeAll(async () => {
    try {
      await setupDB();
      await sequelize.drop();
      await sequelize.sync();
    } catch (error: unknown) {
      throw new Error(`Unable to reset database: ${error}`);
    }
  });

  test('It should respond to the POST method with a unique user', async () => {
    const response = await request(app).post('/api/users/signup').send({
      username: 'testUser',
      email: 'test@example.com',
      password: 'TestPassword1!',
    });
    expect(response.statusCode).toBe(201);
  });

  afterAll(async () => {
    try {
      await sequelize.close();
    } catch (error: unknown) {
      throw new Error(`Unable to drop tables: ${error}`);
    }
  });
});
