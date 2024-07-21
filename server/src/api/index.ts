import express from 'express';
import users from './users.api';
import tweets from './tweets.api';
import refresh from './refresh.api';

const router = express.Router();

const routes = {
  '/users': users,
  '/tweets': tweets,
  '/refresh': refresh,
};

for (const [ path, handler ] of Object.entries(routes)) {
  router.use(path, handler);
}

export default router;
