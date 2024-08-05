import express from 'express';
import { cors, cookies, router, httpLogger, errorLogger } from './middleware';
import { loadEnvVars } from './utils/env';

loadEnvVars();

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies);
app.use(httpLogger);
app.use('/', router);
app.use(errorLogger);

export { app };
