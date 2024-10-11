import { db } from '@db';

beforeEach(async () => {
  await db.setup(true);

  // return async () => {
  //   await db.close();
  // };
});

// afterAll(async () => {
//   await db.close();
// });
