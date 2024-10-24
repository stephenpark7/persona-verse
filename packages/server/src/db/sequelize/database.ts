import { sequelize } from './sequelize';
import { setupAssociations } from './models';

export const setupDatabase = async (dropTables: boolean): Promise<void> => {
  if (process.env.NODE_ENV === 'production' && dropTables === true) {
    throw new Error('Cannot drop tables in production.');
  }

  await sequelize.authenticate();

  await setupAssociations();

  await sequelize.sync(
    dropTables === true && process.env.NODE_ENV !== 'production'
      ? { force: true }
      : undefined,
  );
};

export const resetDatabase = async (): Promise<void> => {
  await sequelize.sync({ force: true });
};

export const closeDatabaseConnection = async (): Promise<void> => {
  await sequelize.close();
};
