import { db } from '@db';

beforeAll(async () => {
  await db.setup();
});

afterAll(async () => {
  await db.close();
});
