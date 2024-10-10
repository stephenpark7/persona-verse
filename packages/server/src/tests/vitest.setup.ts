import { sequelize, db } from '@db';

beforeAll(async () => {
  await db.setup();
});

afterAll(async () => {
  await sequelize.close();
});
