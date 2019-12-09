import config from './config'
// const user = require('./config');
// import mongoose from './services/mongoose'
import express from './src/services/express';
// import api from './api'




const app = express(config.apiRoot)
// require('greenlock-express').create({
//   version: 'draft-11',
//   server: 'https://acme-v02.api.letsencrypt.org/directory',
//   configDir: '~/.config/acme/',
//   email: 'olaayo10@gmail.com',
//   approvedDomains: [ 'api.posha24.com' ],
//   agreeTos: true,
//   app: app,
//   communityMember: true,
//   telemetry: true
// }).listen(80, 443)

// mongoose.connect(mongo.uri, { useCreateIndex: true, useNewUrlParser: true })
// mongoose.Promise = Promise

export default app