import { setupDatabase, sequelize } from '@db';

beforeAll(async () => {
  // TODO: need to make sure all tables exist
  // and associations are set up
  // await sequelize.sync({ force: true });
  await setupDatabase();
});

// afterEach(async () => {
//   await sequelize.truncate({ cascade: true });
// });

afterAll(async () => {
  await sequelize.close();
});
