import { sequelize } from './sequelize';
import * as models from '@models';
import { setupDatabase } from './setupDatabase';

// TODO: refactor to use a singleton pattern

export const db = (() => {
  return {
    sequelize,
    setupDatabase,
    models,
  };
})();
