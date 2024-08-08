import { loadEnvironmentVariables } from './utils/env';
import express from 'express';
import { startServer } from './server';
import { setupBindings } from './middleware';

loadEnvironmentVariables();

export const app = express();

setupBindings(app);

app.setupMiddleware();

startServer();
