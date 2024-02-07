import { UserRole } from '@/utils';
import Joi from 'joi';

export const signUpSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(UserRole.ATHELETE, UserRole.COACH).required(),
};
