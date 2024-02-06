import { Router } from 'express';

import { authRouter } from '@routes/index';

const router = Router();

router.use('/auth', authRouter);

export { router };
