import dotenv from 'dotenv';

const validateRequiredEnvVars = () => {
  const requiredEnvVars = ['JWT_SECRET'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} is not defined in .env file`);
    }
  }
};

export const loadEnvironmentVariables = () => {
  const NODE_ENV = process.env.NODE_ENV || 'development';

  if (NODE_ENV !== 'development' && NODE_ENV !== 'test') return;

  dotenv.config({
    path: `.env.${NODE_ENV}`,
    debug: true,
  });

  validateRequiredEnvVars();
};
