import { Sequelize } from 'sequelize';
import { sequelizeOptions } from './config';

export const sequelize = new Sequelize(sequelizeOptions);

process.on('SIGINT', () => {
  sequelize.close();
  process.exit();
});
