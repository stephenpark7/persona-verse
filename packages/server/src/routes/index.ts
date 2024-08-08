import express from 'express';
import { usersRoute } from './users.route';
import { tweetsRoute } from './tweets.route';
import { refreshRoute } from './refresh.route';

export const routes = express.Router();

routes.use('/users', usersRoute);
routes.use('/tweets', tweetsRoute);
routes.use('/refresh', refreshRoute);
