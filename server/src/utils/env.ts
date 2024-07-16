import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local',
  debug: process.env.NODE_ENV === 'development',
});

export default {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_HOST: process.env.CLIENT_HOST,
  CLIENT_PORT: process.env.CLIENT_PORT,
  SERVER_PORT: process.env.SERVER_PORT,
};
