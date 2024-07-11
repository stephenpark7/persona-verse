import express from 'express';
import { create, get } from '../controllers/tweet.controller';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/create', auth, async (req, res) => {
  await create(req, res);
});

router.get('/get', auth, async (req, res) => {
  await get(req, res);
});

export default router;
