import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      dirname: 'logs',
      filename: `error-${process.env.NODE_ENV}.log`,
    }),
  ],
});
