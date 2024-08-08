import { loadEnvironmentVariables } from './utils/env';

loadEnvironmentVariables();

import express from 'express';
import { setupMiddleware } from './middleware';
import { startRESTServer } from './restServer';
import { startTRPCServer } from './trpcServer';

const app = express();

setupMiddleware(app);

(async () => {
  startTRPCServer();
  await startRESTServer();
})();

export { app };
