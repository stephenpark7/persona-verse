import { Sequelize, Options } from 'sequelize';

const sequelizeOptions: Options = {
  database: `${process.env.DB_NAME}_${process.env.NODE_ENV}`,
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

const sequelize = new Sequelize(sequelizeOptions);

process.on('SIGINT', () => {
  sequelize.close();
  process.exit();
});

export {
  sequelize,
};
