import express from 'express';
import { create, login } from '../controllers/user.controller';

const router = express.Router();

router.post('/signup', async (req, res) => {
  await create(req, res);
});

router.post('/login', async (req, res) => {
  await login(req, res);
});

export default router;
