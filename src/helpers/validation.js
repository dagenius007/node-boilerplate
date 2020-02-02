import Joi from 'joi';

export const userSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string().required(),
	address: Joi.string().required(),
	userType: Joi.string().required(),
});

export const loginSchema = Joi.object({
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string().required(),
});
