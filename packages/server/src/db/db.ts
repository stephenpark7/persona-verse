import * as models from '@models';
import {
  sequelize,
  setupDatabase,
  closeDatabaseConnection,
} from './sequelize/sequelize';

export const setup = async (): Promise<void> => {
  await setupDatabase(sequelize);
};

export const close = async (): Promise<void> => {
  await closeDatabaseConnection(sequelize);
};

export const db = {
  models,
  sequelize,
  setup,
  close,
};
