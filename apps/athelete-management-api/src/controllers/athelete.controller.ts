import { HttpStatusCode } from 'axios';
import { NextFunction, Response, Request } from 'express';

import { CustomRequest, sendResponse } from '@/helpers';
import { createActivity, createEvent } from '@/services';
import { ResponseMessage } from '@/utils';

const postActivity = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId: user } = req.user;

    const newActivity = await createActivity({ ...req.body, user });
    await createEvent({ event: 'POST_ACTIVITY', user });

    sendResponse({
      isSuccess: true,
      message: ResponseMessage.ACTIVITY_CREATED,
      res,
      status: HttpStatusCode.Created,
      data: newActivity,
    });
  } catch (error) {
    next(error);
  }
};

export { postActivity };
