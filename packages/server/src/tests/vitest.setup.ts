import { setupDatabase, sequelize } from '@db';

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await sequelize.close();
});
