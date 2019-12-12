import mongoose, { Schema } from 'mongoose';

const roles = ['user', 'super-admin', 'admin'];

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		trim: true,
		required: true,
		minlength: 6
	},
	email: {
		type: String,
		match: /^\S+@\S+\.\S+$/,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	role: {
		type: String,
		enum: roles,
		default: 'user'
	},
	picture: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('User', userSchema);


