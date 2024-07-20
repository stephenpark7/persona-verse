import request from 'supertest';
import app from '../'; // Ensure this is the correct path to your app
import { sequelize } from '../models';

describe('POST /users/signup', () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // await sequelize.close();
  });

  test('It should respond with a 200 status code', async () => {
    const response = await request(app).post('/api/users/signup').send({
      // Include any required payload for signup
      username: 'testuser',
      password: 'testpassword',
    });

    expect(response.statusCode).toBe(200);
  });
});
