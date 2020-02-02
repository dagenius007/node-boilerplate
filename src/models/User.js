import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const roles = ['user', 'super-admin', 'admin'];

const UserSchema = new Schema({
	_id: Schema.Types.ObjectId,
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	address: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
	},
	password: {
		type: String,
	},
	userType: {
		type: String,
		enum: ['freight', 'car_shippment'],
	},
});

UserSchema.pre('save', function(next) {
	const user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

UserSchema.methods.validateUser = function(userPassword, callback) {
	bcrypt.compare(userPassword, this.password, function(err, isMatch) {
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

UserSchema.methods.toJSON = function() {
	var obj = this.toObject();
	delete obj.password;
	return obj;
};

module.exports = mongoose.model('User', UserSchema);
