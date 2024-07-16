import dotenv from 'dotenv';
dotenv.config({
  path: `.env.development.local`,
  debug: process.env.NODE_ENV === 'development',
});

import express from 'express';
import path from 'path';

import users from './api/users';
import tweets from './api/tweets';
import refresh from './api/refresh';

import cors from 'cors';
import corsMiddleware from './middlewares/cors';

import cookieSession from 'cookie-session';

const app = express();

app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
  domain: process.env.COOKIE_DOMAIN,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  signed: true,
  overwrite: true,
}));

// app.use(cors());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', users);
app.use('/api/tweets', tweets);
app.use('/api', refresh);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server started at port ' + process.env.SERVER_PORT);
});

