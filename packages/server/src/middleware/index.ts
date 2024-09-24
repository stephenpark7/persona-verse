import * as express from 'express';
import { Express } from 'express';
import { corsMiddleware } from './cors';
import { cookies } from './cookies';
import { httpLogger } from './httpLogger';
import { errorLogger } from './errorLogger';

import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter, createContext } from '../trpc';
import { startServer } from '../server';

export const setupMiddleware = function (this: Express) {
  this.use(corsMiddleware());
  this.use(express.json());
  this.use(express.urlencoded({ extended: true }));
  this.use(cookies);
  this.use(httpLogger);
  this.use(errorLogger);
  this.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
};

export const setupBindings = function (app: Express) {
  app.setupMiddleware = setupMiddleware.bind(app);
  app.startServer = startServer.bind(app);
};
