import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { userSchema } from '../helpers/validation';
const User = require('../models/userModel');

export const createUser = async (req, res) => {
	const validator = Joi.validate(req.body, userSchema);
	if (validator.error === null) {
		try {
			let user = await User.create({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				username: req.body.username
			});
			console.log(user);
			res.status(200).json({ message: 'Created successfully', user });
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: 'Error' });
		}
	} else {
		const message = validator.error.details.map(i => i.message).join(',');
		console.log('error', message);
		res.status(422).json({ error: message });
	}
};

export const loginUser = async (req, res) => {
	// const validator = Joi.validate(req.body, userSchema);
	// if (validator.error === null) {
	try {
		const user = await User.findOne({
			email: req.body.email
		});
		if (user) {
			bcrypt.compare(req.body.password, user.password, function(err, res) {
				return err
					? res.status(401).json({ message: 'Authentication failed' })
					: res.status(200).json({ message: 'Success', user });
			});
			res.status(200).json({ message: 'Created successfully', user });
		}
	} catch (e) {
		console.log(e);
		return res.status(401).json({ message: 'Authentication failed' });
	}
};
