import * as models from '@models';
import { sequelize, setupDatabase } from './sequelize/sequelize';

export const setup = async (): Promise<void> => {
  await setupDatabase();
};

export const db = {
  models,
  sequelize,
  setup,
};
