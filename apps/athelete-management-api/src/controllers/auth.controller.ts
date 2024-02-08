import { NextFunction, Request, Response } from 'express';

import { User } from '@/models';
import { sendResponse } from '@/helpers';
import { getUserByEmail } from '@/services';
import { ResponseMessage } from '@/utils';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email} = req.body

    const isExistingEmail = await getUserByEmail(email)

    if(!isExistingEmail) throw new Error(ResponseMessage.EMAIL_TAKEN)

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

export { signUp };
