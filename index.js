import config from './config';
// import { port, apiRoot } from './config'
import mongoose from './src/services/mongo';
import express from './src/services/express';

global.requireWrapper = name => {
	return require(__dirname + 'src/' + name);
};

const app = express(config.apiRoot);

mongoose.connect(config.mongo.uri, { useCreateIndex: true, useNewUrlParser: true });
// mongoose.Promise = Promised

console.log(__dirname);

app.listen(config.port, () => console.log(`Node Server listening on port ${config.port}!`));

// export default app
