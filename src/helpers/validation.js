import Joi from 'joi';

export const userSchema = Joi.object({
	name: Joi.string(),
	username: Joi.string().required(),
	email: Joi.string().email(),
	password: Joi.string().required(),
});
