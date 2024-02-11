import { startSession } from 'mongoose';
import { Response, NextFunction } from 'express';

import { CustomRequest, sendResponse } from '@/helpers';
import { HttpMessage } from '@/utils';

const transaction = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const session = await startSession();

  try {
    session.startTransaction();

    req.session = session;

    next();
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

const commitTransaction = async (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    await req.session.commitTransaction();
    req.session.endSession();

    next();
  } catch (error) {
    await req.session.abortTransaction();
    req.session.endSession();
    next(error);
  }
};

export { transaction, commitTransaction };
