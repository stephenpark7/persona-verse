import winston from 'winston';
import { Sequelize } from 'sequelize';
import { sequelizeOptions } from './config';
import { initModels } from './models';
// import { db } from '../db';

// TODO: we should still start the server for test environment
// so that we can make use of winston logger

export const sequelize = new Sequelize(sequelizeOptions);

export const setupDatabase = async (dropTables: boolean): Promise<void> => {
  if (process.env.NODE_ENV === 'production' && dropTables === true) {
    winston.error('Cannot drop tables in production.');
    dropTables = false;
  }

  await sequelize.authenticate();

  await initModels(sequelize);

  await sequelize.sync(dropTables === true ? { force: true } : undefined);
};

export const resetDatabase = async (): Promise<void> => {
  await sequelize.sync({ force: true });
};

export const closeDatabaseConnection = async (): Promise<void> => {
  await sequelize.close();
};

process.on('SIGINT', () => {
  sequelize.close();
  process.exit();
});
