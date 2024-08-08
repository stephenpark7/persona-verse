import { loadEnvironmentVariables } from './utils/env';
import { createContext } from './trpc/context';

loadEnvironmentVariables();

import express from 'express';
import { setupMiddleware } from './middleware';
import { startServer } from './server';

import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';

const app = express();

setupMiddleware(app);

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

startServer();

export { app };
