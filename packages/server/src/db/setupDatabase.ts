import { sequelize } from './sequelize';

export const setupDatabase = async (): Promise<void> => {
  await sequelize.authenticate();
  await sequelize.sync();
};
