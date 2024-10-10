import * as models from '@models';
import { sequelize } from './sequelize';
import { setupDatabase } from './setupDatabase';

export const db = {
  models,
  sequelize,
  setupDatabase,
};
