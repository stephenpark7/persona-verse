import { loadEnvironmentVariables } from './utils/env';

loadEnvironmentVariables();

import express from 'express';
import { setupMiddleware } from './middleware';
import { startServer } from './server';

import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const app = express();

setupMiddleware(app);

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

(async () => {
  await startServer();
})();

export { app };
