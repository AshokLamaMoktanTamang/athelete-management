import Joi, { ValidationError, ValidationOptions } from 'joi';
import { Request, Response, NextFunction } from 'express';

import { sendResponse } from '@/helpers';
import { HttpStatusCode } from 'axios';
import { HttpMessage } from '@/utils';

interface ValidationSchema {
  [key: string]: Joi.AnySchema;
}

const validateRequest = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const options: ValidationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = Joi.object(schema).validate(req.body, options);

    if (error) {
      sendResponse<ValidationError>({
        res,
        status: HttpStatusCode.BadRequest,
        message: HttpMessage.BadRequest,
        data: error,
        isSuccess: false,
      });
    } else {
      req.body = value;
      next();
    }
  };
};

export { validateRequest };
