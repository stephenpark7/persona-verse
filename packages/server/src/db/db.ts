import {
  setupDatabase,
  closeDatabaseConnection,
  resetDatabase,
} from './sequelize';

export const setup = async (dropTables: boolean): Promise<void> => {
  await setupDatabase(dropTables);
};

export const close = async (): Promise<void> => {
  await closeDatabaseConnection();
};

export const reset = async (): Promise<void> => {
  await resetDatabase();
};

export const db = {
  setup,
  close,
  reset,
};
