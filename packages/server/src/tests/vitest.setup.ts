import { sequelize, setupDatabase } from '@db';

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await sequelize.close();
});
