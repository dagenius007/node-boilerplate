import express from 'express'
import cors from 'cors'
// import compression from 'compression'
import morgan from 'morgan';
import bodyParser from 'body-parser'
import router from '../routes/router'
// import { errorHandler as queryErrorHandler } from 'querymen'
// import { errorHandler as bodyErrorHandler } from 'bodymen'
// import { env } from '../../config'

export default (apiRoot) => {
  const app = express()

  /* istanbul ignore next */
  if (process.env === 'production' || process.env === 'development') {
    app.use(cors())
    // app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, router)
//   app.use(queryErrorHandler())
//   app.use(bodyErrorHandler())

  return app
}