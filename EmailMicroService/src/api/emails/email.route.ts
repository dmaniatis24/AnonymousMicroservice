import { Router } from 'express'
import MySqlApp from '../../infrastructure/utilities/MySql'
import logger from '../../infrastructure/utilities/Logger'
import config from '../../config'
import EmailsRepository from "./email.repository";
import EmailsService from "./email.service";
import EmailController from "./email.controller";
import { authenticateMiddleware } from '../../infrastructure/middlewares/auth/AuthUser'

const { validate } = require('../../infrastructure/middlewares/validationData/ValidationData')
import { postReportValidator } from '../../infrastructure/middlewares/validationData/ReportValidation'
const mysql = new MySqlApp({ logger: logger, options: config.db })
const router = Router()

const repository = new EmailsRepository({ mysql, logger })
const service = new EmailsService({ repository })
const controller = new EmailController({ service })

router.post('/', controller.post.bind(controller))

export default router
