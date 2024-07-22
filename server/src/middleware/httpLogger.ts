import winston from 'winston';
import expressWinston from 'express-winston';
// import { Request, Response } from 'express';

// const logFormat = winston.format.printf(function(info) {
//   const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
//   const infoLevel = info.level.toUpperCase();
//   const message = JSON.stringify(info.message, null, 4);
//   return `${date} [${infoLevel}] - ${message}\n`;
// });

const httpLogger = () => {
  return expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `logs/${process.env.NODE_ENV}.log` }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint(),
      // logFormat,
    ),
    level: 'info',
    // msg: '{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
    expressFormat: true,
    colorize: true,
    meta: true,
  });
};

export default httpLogger();
