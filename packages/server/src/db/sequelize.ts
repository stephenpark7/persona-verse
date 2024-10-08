import { z } from 'zod';
import { type Options, Sequelize } from 'sequelize';

const sequelizeOptionsSchema = z.custom<Options>();

type SequelizeOptions = z.infer<typeof sequelizeOptionsSchema>;

const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  ssl: process.env.NODE_ENV === 'production',
  sync: { force: process.env.NODE_ENV === 'test' },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};

sequelizeOptionsSchema.parse(sequelizeOptions);

export const sequelize = new Sequelize(sequelizeOptions);

process.on('SIGINT', () => {
  sequelize.close();
  process.exit();
});
