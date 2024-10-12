import { db } from '@db';

beforeAll(async () => {
  await db.setup(true);

  return async () => {
    await db.close();
  };
});

// beforeEach(async () => {
//   await db.reset();
// });

// afterEach(async () => {
//   await db.reset();
// });

afterAll(async () => {
  await db.close();
});
