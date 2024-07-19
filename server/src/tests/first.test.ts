import request from 'supertest';
import app from '../'; // Ensure this is the correct path to your app
import { sequelize } from '../models'; // Ensure this is the correct path to your Sequelize instance

describe('POST /users/signup', () => {
  beforeAll(async () => {
    // Sync the database before running tests
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  });

  afterAll(async () => {
    // Close the database connection after tests
    try {
      await sequelize.close();
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  });

  test('It should respond with a 200 status code', async () => {
    const response = await request(app).post('/users/signup').send({
      // Include any required payload for signup
      username: 'testuser',
      password: 'testpassword',
    });
    expect(response.statusCode).toBe(200);
  });
});
