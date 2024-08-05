import express from 'express';
import { setupMiddleware } from './middleware';
import { loadEnvironmentVariables } from './utils/env';

loadEnvironmentVariables();

const app = express();

setupMiddleware(app);

export { app };
