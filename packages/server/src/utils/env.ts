import dotenv from 'dotenv';

const loadEnvironmentVariables = () => {
  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
    return;
  }
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
    debug: true,
  });
};

export { loadEnvironmentVariables };
