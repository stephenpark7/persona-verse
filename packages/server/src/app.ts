import { loadEnvironmentVariables } from './utils/env';
import express from 'express';
import { setupBindings } from './middleware';

loadEnvironmentVariables();

export const app = express();

setupBindings(app);
app.setupMiddleware();
app.startServer();
