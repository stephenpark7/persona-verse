import express from 'express';
import { routes } from '../routes';

export const router = express.Router();

router.use('/api', routes);
