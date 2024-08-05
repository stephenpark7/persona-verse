import express, { Express } from 'express';
import cors from './cors';
import cookies from './cookies';
import router from './router';
import httpLogger from './httpLogger';
import errorLogger from './errorLogger';

const setupMiddleware = (app: Express) => {
  app.use(cors);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookies);
  app.use(httpLogger);
  app.use('/', router);
  app.use(errorLogger);
};

export { setupMiddleware };
