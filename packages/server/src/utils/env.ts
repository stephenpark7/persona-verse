import dotenv from 'dotenv';

const loadEnvironmentVariables = () => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
    debug: true,
  });
};

export { loadEnvironmentVariables };
