import { Response, NextFunction } from 'express';

import { getDbClient } from '@/config';
import { CustomRequest, sendResponse } from '@/helpers';
import { HttpMessage } from '@/utils';

const transaction = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const session = await getDbClient().startSession();

  try {
    session.startTransaction();

    req.session = session;

    next();

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    sendResponse({
      message: HttpMessage.InternalServerError,
      res,
      status: 500,
    });
  }
};

export default transaction;
