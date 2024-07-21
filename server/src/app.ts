import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}.local`,
  debug: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
});

import express from 'express';
import { cors, cookies, router } from './middleware';

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies);
app.use('/', router);

export default app;
