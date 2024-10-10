import { Sequelize } from 'sequelize';
import { sequelizeOptions } from './config';

export const sequelize = new Sequelize(sequelizeOptions);

export const setupDatabase = async (): Promise<void> => {
  await sequelize.authenticate();
  await sequelize.sync();
};

process.on('SIGINT', () => {
  sequelize.close();
  process.exit();
});
