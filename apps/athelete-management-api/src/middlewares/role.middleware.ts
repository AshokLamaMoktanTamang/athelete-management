import { NextFunction, Response } from 'express';

import { CustomRequest, sendResponse } from '@/helpers';
import { HttpMessage, UserRole } from '@/utils';
import { HttpStatusCode } from 'axios';

export const role = (allowedRoles: Array<keyof typeof UserRole>) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return sendResponse({
        res,
        message: HttpMessage.Forbidden,
        status: HttpStatusCode.Forbidden,
      });
    }
    next();
  };
};
