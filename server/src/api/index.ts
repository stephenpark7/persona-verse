import express from 'express';
import users from '../api/users';
import tweets from '../api/tweets';
import refresh from '../api/refresh';

const router = express.Router();

const routes = {
  '/users': users,
  '/tweets': tweets,
  '/refresh': refresh
};

for (let [ path, handler ] of Object.entries(routes)) {
  router.use(path, handler);
}

export default router;
