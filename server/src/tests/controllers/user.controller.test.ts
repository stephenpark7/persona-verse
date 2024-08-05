import request from 'supertest';
import { app } from '../../app';
import { db } from '../../db';

const {
  sequelize,
  setupDB,
} = db;

describe('POST /api/users/signup', () => {
  beforeAll(async () => {
    await setupDB();
  });

  describe('when the request body is valid', () => {
    test('it should return a 201 status code and a message', async () => {
      const response = await request(app).post('/api/users/signup').send({
        username: 'testUser',
        email: 'test@example.com',
        password: 'TestPassword1!',
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Account created successfully.');
    });
  });

  describe('when the request body is invalid', () => {
    test('it should return a 400 status code and a message', async () => {
      const response = await request(app).post('/api/users/signup').send({
        username: 'testUser',
        email: 'test@example.com',
        password: 'TestPassword1!',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Username already in use.');
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
