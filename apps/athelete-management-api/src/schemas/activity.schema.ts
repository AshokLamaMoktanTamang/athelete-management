import Joi from 'joi';

const postActivitySchema = {
  title: Joi.string().required(),
  venue: Joi.string()
};

export { postActivitySchema };
