import { Router } from 'express';

import { atheleteRouter, authRouter } from '@routes/index';

const router = Router();

router.use('/auth', authRouter);
router.use('/athelete', atheleteRouter);

export { router };
