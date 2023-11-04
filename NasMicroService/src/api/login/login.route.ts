import { Router } from 'express'
import MySqlApp from '../../infrastructure/utilities/MySql'
import logger from '../../infrastructure/utilities/Logger'
import config from '../../config'
import LoginRepository from './login.repository'
import LoginService from './login.service'
import LoginController from './login.controller'
import { authenticateMiddleware } from '../../infrastructure/middlewares/auth/AuthUser'

const mysql = new MySqlApp({ logger: logger, options: config.db })
const router = Router()

const repository = new LoginRepository({ mysql, logger })
const service = new LoginService({ repository })
const controller = new LoginController({ service })

router.get('/login', controller.login.bind(controller))
router.get('/logout', authenticateMiddleware, controller.logout.bind(controller))

export default router
