

import { Router } from 'express';
import apiRouter from './api';
import apiDocsRouter from './api-docs';

const router = Router();

router.use('/api', apiRouter);
router.use('/api-docs', apiDocsRouter);

export default router;
