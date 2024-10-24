import { db } from '@db';

beforeAll(async () => {
  await db.setup(true);

  return async () => {
    await db.close();
  };
});

afterAll(async () => {
  await db.close();
});
