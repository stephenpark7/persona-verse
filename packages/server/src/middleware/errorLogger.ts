import winston from 'winston';
import expressWinston from 'express-winston';

export const errorLogger = (() => {
  return expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        dirname: 'logs',
        filename: `error-${process.env.NODE_ENV}.log`,
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
  });
})();
