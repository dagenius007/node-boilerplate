import mongoose from 'mongoose';
import Joi from 'joi';
import { userSchema, loginSchema } from '../helpers/validation';
const config = require('../config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

export const signup = async (req, res) => {
	const validator = Joi.validate(req.body, userSchema);
	if (validator.error === null) {
		try {
			await User.create({
				_id: new mongoose.Types.ObjectId(),
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
				address: req.body.address,
				userType: req.body.userType,
			});

			res.status(200).json({ message: 'User created successfully', success: true });
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: 'Error' + e });
		}
	} else {
		const message = validator.error.details.map(i => i.message).join(',');
		res.status(422).json({ error: message });
	}
};

export const loginUser = async (req, res) => {
	const validator = Joi.validate(req.body, loginSchema);
	if (validator.error === null) {
		try {
			const user = await User.findOne({
				email: req.body.email,
			});
			if (user) {
				// console.log(user, User);
				user.validateUser(req.body.password, function(err) {
					if (err) {
						console.log(err);
						return res.status(401).json({ message: 'Authentication failed' });
					} else {
						const token = jwt.sign({ email: user.email }, config.jwtSecret, {
							expiresIn: 86400,
						});

						res.status(200).json({ user: user.toJSON(), token });
					}
				});
			} else {
				return res.status(404).json({ message: 'User not found', success: false });
			}
		} catch (e) {
			console.log(e);
			return res.status(401).json({ message: 'Email/Password incorrect', success: false });
		}
	} else {
		const message = validator.error.details.map(i => i.message).join(',');
		res.status(422).json({ error: message });
	}
};
