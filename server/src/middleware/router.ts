import express from 'express';
import { routes } from '../routes';

const router = express.Router();

router.use('/api', routes);

export { router };
