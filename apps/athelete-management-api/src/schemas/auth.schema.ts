import { UserRole } from '@/utils';
import Joi from 'joi';

const common = {
  password: Joi.string().required(),
  email: Joi.string().required().email({
    minDomainSegments: 2,
  }),
};

const signUpSchema = {
  ...common,
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid(UserRole.ATHELETE, UserRole.COACH).required(),
};

const loginSchema = { ...common };

export { loginSchema, signUpSchema };
