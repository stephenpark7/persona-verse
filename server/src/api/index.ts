import express from 'express';
import { usersApi } from './users.api';
import { tweetsApi } from './tweets.api';
import { refreshApi } from './refresh.api';

const router = express.Router();

router.use('/users', usersApi);
router.use('/tweets', tweetsApi);
router.use('/refresh', refreshApi);

export default router;
