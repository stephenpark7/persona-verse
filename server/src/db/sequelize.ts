import { Sequelize, Options } from 'sequelize';

const sequelizeOptions: Options = {
  database: `${process.env.DB_NAME}_${process.env.NODE_ENV}`,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};

const sequelize = new Sequelize(sequelizeOptions);

process.on('SIGINT', () => {
  sequelize.close();
});

export {
  sequelize,
};
