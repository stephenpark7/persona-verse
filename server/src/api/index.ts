import express from 'express';
import { usersApi } from './users.api';
import { tweetsApi } from './tweets.api';
import { refreshApi } from './refresh.api';

const api = express.Router();

api.use('/users', usersApi);
api.use('/tweets', tweetsApi);
api.use('/refresh', refreshApi);

export { api };
