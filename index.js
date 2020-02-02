import config from './config';
import mongoose from './src/services/mongo';
import express from './src/services/express';



const app = express(config.apiRoot);

global.__basedir = __dirname;

mongoose.connect(config.mongo.uri, { useCreateIndex: true, useNewUrlParser: true });
// mongoose.Promise = Promised

app.listen(config.port, () => console.log(`Node Server listening on port ${config.port}!`));

// export default app
