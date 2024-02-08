import { sendResponse } from '@/helpers';
import { HttpMessage } from '@/utils';
import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;

  if ('statusCode' in err && typeof err['statusCode'] === 'number') {
    statusCode = err['statusCode'];
  }

  sendResponse({
    message: HttpMessage.InternalServerError,
    status: HttpStatusCode.InternalServerError,
    res,
    data: err,
  });
};

export default errorHandler
