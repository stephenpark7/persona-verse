import * as models from '@models';
import {
  closeDatabaseConnection,
  sequelize,
  setupDatabase,
} from './sequelize/sequelize';

export const setup = async (): Promise<void> => {
  await setupDatabase();
};

export const close = async (): Promise<void> => {
  await closeDatabaseConnection();
};

export const db = {
  models,
  sequelize,
  setup,
  close,
};
