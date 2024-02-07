import { Router } from 'express';

import { signUp } from '@/controllers';
import { validateRequest } from '@/middlewares';
import { signUpSchema } from '@/schemas';

const authRouter = Router();

authRouter.post('/signup', validateRequest(signUpSchema), signUp);

export { authRouter };
