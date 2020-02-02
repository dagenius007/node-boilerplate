import mongoose from 'mongoose';
import Joi from 'joi';
import { userSchema } from '../helpers/validation';
const config = require('../../config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

export const createPost = async (req, res) => {
	const validator = Joi.validate(req.body, userSchema);
	if (validator.error === null) {
		try {
			let user = await User.create({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				email: req.body.email,
				username: req.body.username,
				password: req.body.password,
				userType: req.body.userType,
			});

			res.status(200).json({ message: 'User created successfully', success: true });
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: 'Error' + e });
		}
	} else {
		const message = validator.error.details.map(i => i.message).join(',');
		console.log('error', message);
		res.status(422).json({ error: message });
	}
};

export const getPosts = async (req, res) => {
	// const validator = Joi.validate(req.body, userSchema);
	// if (validator.error === null) {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});
		if (user) {
			User.comparePassword('Password123', function(err, res) {
				if (err) {
					return res.status(401).json({ message: 'Authentication failed' });
				} else {
					const token = jwt.sign({ email: user.email }, config.jwtSecret, {
						expiresIn: 86400,
					});
					res.status(200).json({ user, token });
				}
				return err
					? res.status(401).json({ message: 'Authentication failed' })
					: res.status(200).json({ message: 'Success', user });
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(401).json({ message: 'Email/Password incorrect' });
	}
};

export const getPost = async (req, res) => {
	// const validator = Joi.validate(req.body, userSchema);
	// if (validator.error === null) {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});
		if (user) {
			User.comparePassword('Password123', function(err, res) {
				if (err) {
					return res.status(401).json({ message: 'Authentication failed' });
				} else {
					const token = jwt.sign({ email: user.email }, config.jwtSecret, {
						expiresIn: 86400,
					});
					res.status(200).json({ user, token });
				}
				return err
					? res.status(401).json({ message: 'Authentication failed' })
					: res.status(200).json({ message: 'Success', user });
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(401).json({ message: 'Email/Password incorrect' });
	}
};

export const deletePost = async (req, res) => {
	// const validator = Joi.validate(req.body, userSchema);
	// if (validator.error === null) {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});
		if (user) {
			User.comparePassword('Password123', function(err, res) {
				if (err) {
					return res.status(401).json({ message: 'Authentication failed' });
				} else {
					const token = jwt.sign({ email: user.email }, config.jwtSecret, {
						expiresIn: 86400,
					});
					res.status(200).json({ user, token });
				}
				return err
					? res.status(401).json({ message: 'Authentication failed' })
					: res.status(200).json({ message: 'Success', user });
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(401).json({ message: 'Email/Password incorrect' });
	}
};
