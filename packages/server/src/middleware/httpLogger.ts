import winston from 'winston';
import expressWinston from 'express-winston';

const logFormat = winston.format.printf((info) => {
  const {
    timestamp, level, message, ...args
  } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');
  return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
});

export const httpLogger = (() => {
  return expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `logs/${process.env.NODE_ENV}.log` }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      logFormat,
    ),
    level: 'info',
    expressFormat: true,
    meta: true,
  });
})();
