import express from 'express';
import users from '../api/users';
import tweets from '../api/tweets';
import refresh from '../api/refresh';

const router = express.Router();

router.use('/', users);
router.use('/', tweets);
router.use('/', refresh);

export default router;
