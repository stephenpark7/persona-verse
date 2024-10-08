import { db, sequelize } from '@db';

beforeAll(async () => {
  await db.setupDatabase();
});

afterAll(async () => {
  await sequelize.close();
});
