import dotenv from 'dotenv';

export const loadEnvironmentVariables = () => {
  const NODE_ENV = process.env.NODE_ENV || 'development';

  if (NODE_ENV !== 'development' && NODE_ENV !== 'test') return;
  
  dotenv.config({
    path: `.env.${NODE_ENV}`,
    debug: true,
  });
};
