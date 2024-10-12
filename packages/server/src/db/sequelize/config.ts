import { sequelizeOptionsSchema } from '@schemas';
import { SequelizeOptions } from '@types';

export const sequelizeOptions: SequelizeOptions = {
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
