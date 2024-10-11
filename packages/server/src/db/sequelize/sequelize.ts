import winston from 'winston';
import { Sequelize } from 'sequelize';
import { sequelizeOptions } from './config';
// import '@models'; // Error: No Sequelize instance passed

import { RefreshToken } from './models/RefreshToken';
import { RevokedToken } from './models/RevokedToken';
import { Tweet } from './models/Tweet';
import { User } from './models/User';
import { UserProfile } from './models/UserProfile';

import { initModels } from './models';

// TODO: we should still start the server for test environment
// so that we can make use of winston logger

export const sequelize = new Sequelize(sequelizeOptions);

export const setupDatabase = async (
  sequelize: Sequelize,
  dropTables: boolean,
): Promise<void> => {
  if (process.env.NODE_ENV === 'production' && dropTables === true) {
    winston.error('Cannot drop tables in production.');
    dropTables = false;
  }

  // await sequelize.sync({ force: true });
  await sequelize.authenticate();
  await sequelize.sync(dropTables === true ? { force: true } : undefined);
  await initModels(sequelize);
};

export const closeDatabaseConnection = async (
  sequelize: Sequelize,
): Promise<void> => {
  await sequelize.close();
};

process.on('SIGINT', () => {
  sequelize.close();
  process.exit();
});
