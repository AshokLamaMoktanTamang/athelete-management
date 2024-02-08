import { Response } from 'express';

interface SendResponseParams<T> {
  res: Response;
  status: number;
  message: string;
  isSuccess?: boolean;
  data?: T;
}

const sendResponse = <T>({
  res,
  status,
  message,
  data = null,
  isSuccess = false,
}: SendResponseParams<T>) => {
  return res.status(status).json({
    status,
    message,
    data,
    isSuccess,
  });
};

export { sendResponse };
