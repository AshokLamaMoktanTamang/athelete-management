import { Request, Response } from 'express';

import { User } from '@/models';
import { sendResponse } from '@/helpers';

const signUp = async (req: Request, res: Response) => {
  sendResponse({
    isSuccess: true,
    message: 'Testing',
    res,
    status: 200,
    data: req.body,
  });
};

export { signUp };
