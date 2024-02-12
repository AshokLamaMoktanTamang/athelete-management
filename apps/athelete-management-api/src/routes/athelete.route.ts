import { Router } from 'express';

import { accessToken, role, validateRequest } from '@/middlewares';
import { postActivitySchema } from '@/schemas';
import { postActivity } from '@/controllers';

const atheleteRouter = Router();

atheleteRouter.post(
  '/activity',
  validateRequest(postActivitySchema),
  accessToken,
  role(['ATHELETE']),
  postActivity
);

export { atheleteRouter };
