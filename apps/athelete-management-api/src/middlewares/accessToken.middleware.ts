import { NextFunction, Response } from 'express';
import { HttpStatusCode } from 'axios';
import jwt from 'jsonwebtoken';

import { CustomError, CustomRequest, sendResponse } from '@/helpers';
import { AccesstokenPayload } from '@/dto';
import { HttpMessage } from '@/utils';
import { config } from '@/config';
import { getUserById } from '@/services';

export const accessToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken)
      throw new CustomError(
        HttpMessage.Unauthorized,
        HttpStatusCode.Unauthorized
      );

    jwt.verify(
      accessToken,
      config.jwtSecret,
      async (err, decoded: AccesstokenPayload) => {
        try {
          const user = !err && (await getUserById(decoded.userId));

          if (err || !user)
            throw new CustomError(
              HttpMessage.Unauthorized,
              HttpStatusCode.Unauthorized
            );

          req.user = decoded;

          next();
        } catch (error) {
          return sendResponse({
            message: error.message,
            status: error.status || 500,
            res,
          });
        }
      }
    );
  } catch (error) {
    return sendResponse({
      message: error.message,
      status: error.status,
      res,
    });
  }
};
