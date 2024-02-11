import { HttpStatusCode } from 'axios';
import { NextFunction, Response, Request } from 'express';

import { CustomError, sendResponse } from '@/helpers';
import { createEvent, createUser, getUserByEmail } from '@/services';
import { ResponseMessage } from '@/utils';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const isExistingEmail = await getUserByEmail(email);

    if (isExistingEmail)
      throw new CustomError(ResponseMessage.EMAIL_TAKEN, 409);

    const newUser = await createUser(req.body);
    await createEvent({ event: 'SIGN_UP', user: newUser._id });

    sendResponse({
      isSuccess: true,
      message: ResponseMessage.USER_CREATED,
      res,
      status: HttpStatusCode.Created,
      data: newUser,
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

    await createEvent({ event: 'LOGIN', user: user._id });

    sendResponse({
      isSuccess: true,
      message: ResponseMessage.USER_LOGGED_IN,
      res,
      status: HttpStatusCode.Accepted,
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, login };
