import winston from 'winston';
import path from 'path';

const logDir = path.join(__dirname, '../../logs');

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      dirname: logDir,
      filename: `info-${process.env.NODE_ENV}.log`,
    }),
  ],
});
