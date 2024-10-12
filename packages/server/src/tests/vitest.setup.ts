import { db } from '@db';

beforeAll(async () => {
  await db.setup(true);
});

beforeEach(async () => {
  await db.reset();
});

afterAll(async () => {
  await db.close();
});
