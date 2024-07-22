import winston from 'winston';
import expressWinston from 'express-winston';

const errorLogger = () => {
  return expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `logs/${process.env.NODE_ENV}.log` }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
  });
};

export default errorLogger();
