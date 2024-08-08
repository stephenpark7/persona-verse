import express from 'express';
import { setupMiddleware } from './middleware';
import { loadEnvironmentVariables } from './utils/env';
import { startRESTServer } from './restServer';
import { startTRPCServer } from './trpcServer';

loadEnvironmentVariables();

const app = express();

setupMiddleware(app);

(async () => {
  startTRPCServer();
  await startRESTServer();
})();

export { app };
