import { Sequelize, type Options } from 'sequelize';

const sequelizeOptions: Options = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  // sync: { force: true },
};

export const sequelize = new Sequelize(sequelizeOptions);

process.on('SIGINT', () => {
  sequelize.close();
  process.exit();
});
