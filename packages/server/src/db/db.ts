import * as models from '@models';
import {
  sequelize,
  setupDatabase,
  closeDatabaseConnection,
} from './sequelize/sequelize';

// TODO: db needs to be run first, then models.
// no exceptions. problem is sometimes, models are being imported first
// using @models, and that can cause issues since they depend on db.

export const setup = async (dropTables: boolean): Promise<void> => {
  await setupDatabase(sequelize, dropTables);
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
