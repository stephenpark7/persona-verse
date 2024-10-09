import { sequelize } from './sequelize';

export const setupDatabase = async (): Promise<void> => {
  await sequelize.authenticate();

  // if (process.env.NODE_ENV === 'test') {
  // await sequelize.sync({ force: true });
  // } else {
  await sequelize.sync();
  // }
};
