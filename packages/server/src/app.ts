import { loadEnvironmentVariables } from './utils/env';

loadEnvironmentVariables();

import express from 'express';
import { setupBindings } from './middleware';

export const app = express();

setupBindings(app);

app.setupMiddleware();

app.startServer();
