import { Router } from 'express';

import { login, signUp } from '@/controllers';
import { validateRequest } from '@/middlewares';
import { loginSchema, signUpSchema } from '@/schemas';

const authRouter = Router();

authRouter.post('/signup', validateRequest(signUpSchema), signUp);
authRouter.post('/login', validateRequest(loginSchema), login);

export { authRouter };
