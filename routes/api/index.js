

import { Router } from 'express';

import AuthRouter from './auth.router';
import ArbiterRouter from './arbiter.router';
import DealRouter from './deal.router';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/arbiter', ArbiterRouter);
router.use('/deal', DealRouter);

export default router;
