import * as express from 'express';
import { Application } from 'express';
import { corsMiddleware } from './cors';
import { cookies } from './cookies';
import { router } from './router';
import { httpLogger } from './httpLogger';
import { errorLogger } from './errorLogger';

import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter, createContext } from '../trpc';

export const setupMiddleware = function (this: Express) {
  this.use(corsMiddleware());
  this.use(express.json());
  this.use(express.urlencoded({ extended: true }));
  this.use(cookies);
  this.use(httpLogger);
  this.use('/', router);
  this.use(errorLogger);
  this.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
};

export interface Express extends Application {
  setupMiddleware: (this: Express) => void;
}

export const setupBindings = function (app: Express) {
  app.setupMiddleware = setupMiddleware.bind(app);
};
