import dotenv from 'dotenv';
import winston from 'winston';

const requiredEnvVars = ['JWT_SECRET'];

export const loadEnvironmentVariables = (validate = true): void => {
  const NODE_ENV = process.env.NODE_ENV || 'development';

  winston.info(
    `dotenv ${isDevelopmentOrTestEnv(NODE_ENV) ? 'was' : 'was not'} loaded for ${NODE_ENV} environment.`,
  );

  dotenv.config({
    path: `.env.${NODE_ENV}`,
    debug: true,
  });

  if (validate) {
    validateRequiredEnvVars();
  }
};

const isDevelopmentOrTestEnv = (env: string): boolean => {
  return env === 'development' || env === 'test';
};

const validateRequiredEnvVars = () => {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} is not defined in .env file.`);
    }
  }
};
