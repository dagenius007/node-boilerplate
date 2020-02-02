import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';


const roles = ['user', 'super-admin', 'admin'];

const UserSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		trim: true,
		required: true,
		minlength: 6,
	},
	email: {
		type: String,
		match: /^\S+@\S+\.\S+$/,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		// minlength: 8,
	},
	role: {
		type: String,
		enum: roles,
		default: 'user',
	},
	picture: {
		type: String,
		trim: true,
	},
});

UserSchema.pre('save', function(next) {
	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.hash(this.password, 10, function(err, hash) {
		if (err) return next(err);
		this.password = hash;
		next();
	});
	next();
});

UserSchema.methods.validateUser = function(userPassword, callback) {
	bcrypt.compare(userPassword, user.password, function(err, isMatch) {
		if (err) return next(err);
		callback(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);
