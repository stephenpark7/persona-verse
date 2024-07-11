import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';

import users from './api/users';
import tweets from './api/tweets';

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const PRODUCTION_MODE = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Add CORS headers
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

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

