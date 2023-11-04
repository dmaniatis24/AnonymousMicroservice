import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cron from 'node-cron'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './config'
import logger from './infrastructure/utilities/Logger'
import MySqlApp from './infrastructure/utilities/MySql'

//Import Routes
import usersRoute from './api/users/users.route'
import loginRoute from './api/login/login.route'
import emailsRoute from './api/emails/email.route'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
      cors({
            origin: true,
            credentials: true
      })
)

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dateTime = require('node-datetime')
// const RedisMy = require('./packages/help/RedisMy')

// DB
const mysql = new MySqlApp({ logger: logger, options: config.db })

//Error Handler
const errorMiddlewareGenerator = require('./infrastructure/middlewares/Errors')
const globalErrorMiddleware = errorMiddlewareGenerator(logger)

// ========================== R O U T E S ==========================
app.use('/api/user', usersRoute)
app.use('/api/', loginRoute)
app.use('/api/email', emailsRoute)

// =================================================================

app.use(globalErrorMiddleware)

module.exports = app
