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
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	userType: {
		type: String,
		required: true,
		enum: ['freight', 'car_shippment'],
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
	},
});

UserSchema.pre('save', async function(next) {
	console.log('just before saving');
	// let user = this;
	// if (!user.isModified('password')) {
	// 	return next();
	// }
	// await bcrypt.hash(user.password, 10, function(err, hash) {
	// 	if (err) return next(err);
	// 	user.password = hash;
	// 	next();
	// });
	// next();
});

// UserSchema.methods.validateUser = function(userPassword, callback) {
// 	bcrypt.compare(userPassword, user.password, function(err, isMatch) {
// 		if (err) return next(err);
// 		callback(null, isMatch);
// 	});
// };

module.exports = mongoose.model('User', UserSchema);
