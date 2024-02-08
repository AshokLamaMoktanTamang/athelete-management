import { CustomError, sendResponse } from '@/helpers';
import { HttpMessage } from '@/utils';
import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err.status);

  sendResponse({
    message: err.message || HttpMessage.InternalServerError,
    status: err.status || HttpStatusCode.InternalServerError,
    res,
  });
};

export default errorHandler;
