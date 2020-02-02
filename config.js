import path from 'path';
import merge from 'lodash/merge';

/* istanbul ignore next */
const requireProcessEnv = name => {
	if (!process.env[name]) {
		throw new Error('You must set the ' + name + ' environment variable');
	}
	return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv-safe');
	dotenv.config({
		path: path.join(__dirname, './.env'),
		sample: path.join(__dirname, './.env.example'),
	});
}

const config = {
	all: {
		env: process.env.NODE_ENV || 'development',
		root: path.join(__dirname, '..'),
		port: process.env.PORT || 9000,
		ip: process.env.IP || '0.0.0.0',
		apiRoot: process.env.API_ROOT || '/api/v1',
		jwtSecret: requireProcessEnv('JWT_SECRET'),
		mongo: {
			options: {
				db: {
					safe: true,
				},
			},
		},
	},
	test: {
		mongo: {
			uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test',
			options: {
				debug: true,
			},
		},
	},
	development: {
		mongo: {
			uri: 'mongodb://127.0.0.1:27017/test',
			options: {
				debug: true,
			},
		},
	},
	production: {
		ip: process.env.IP || undefined,
		port: process.env.PORT || 9000,
		mongo: {
			uri: process.env.MONGODB_URI || 'mongodb://localhost/test',
		},
	},
};

module.exports = merge(config.all, config[config.all.env]);

export default module.exports;
