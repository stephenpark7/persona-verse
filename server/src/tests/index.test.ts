import request from 'supertest';
import app from '../app';
import { sequelize, setupDB } from '../db';

describe('POST /api/users/signup', () => {
  beforeAll(async () => {
    await setupDB();
  });

  test('it should return a 201 status code and a message', async () => {
    const response = await request(app).post('/api/users/signup').send({
      username: 'testUser',
      email: 'test@example.com',
      password: 'TestPassword1!',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Account created successfully.');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
