import { NextFunction, Request, Response } from 'express';

import { CustomError, sendResponse } from '@/helpers';
import { createUser, getUserByEmail } from '@/services';
import { ResponseMessage } from '@/utils';
import { User } from '@/models';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const isExistingEmail = await getUserByEmail(email);

    if (isExistingEmail)
      throw new CustomError(ResponseMessage.EMAIL_TAKEN, 409);

    await createUser(req.body);

    sendResponse({
      isSuccess: true,
      message: 'Testing',
      res,
      status: 200,
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    const isPasswordValid = user && (await user.comparePassword(password));

    if (!user || !isPasswordValid)
      throw new CustomError(ResponseMessage.INVALID_CREDENTIALS, 401);

    sendResponse({
      isSuccess: true,
      message: 'Testing',
      res,
      status: 200,
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, login };
