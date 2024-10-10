import { Sequelize } from 'sequelize';
import { sequelizeOptions } from './config';

export const sequelize = new Sequelize(sequelizeOptions);

export const setupDatabase = async (sequelize: Sequelize): Promise<void> => {
  await sequelize.authenticate();
  await sequelize.sync();
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
