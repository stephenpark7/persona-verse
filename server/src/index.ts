import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local',
  debug: process.env.NODE_ENV === 'development',
});

import express from 'express';
import path from 'path';

import users from './api/users';
import tweets from './api/tweets';

import cors from 'cors';
import corsMiddleware from './middlewares/cors';

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const PRODUCTION_MODE = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', users);
app.use('/api/tweets', tweets);

if (PRODUCTION_MODE) {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(SERVER_PORT, () => {
  console.log('Server started at port ' + SERVER_PORT);
});

