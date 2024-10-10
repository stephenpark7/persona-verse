import winston from 'winston';
import { Sequelize } from 'sequelize';
import { sequelizeOptions } from './config';
import '@models'; // Error: No Sequelize instance passed

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

  // TODO: initialize models here

  await sequelize.authenticate();
  await sequelize.sync(dropTables === true ? { force: true } : undefined);
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
