import { Router } from 'express'
import MySqlApp from '../../infrastructure/utilities/MySql'
import logger from '../../infrastructure/utilities/Logger'
import config from '../../config'
import UsersRepository from './users.repository'
import UsersService from './users.service'
import UsersController from './users.controller'
import { authenticateMiddleware } from '../../infrastructure/middlewares/auth/AuthUser'

const { validate } = require('../../infrastructure/middlewares/validationData/ValidationData')
import { patchUserValidator, postUserValidator } from '../../infrastructure/middlewares/validationData/UserValidation'

const mysql = new MySqlApp({ logger: logger, options: config.db })
const router = Router()

const repository = new UsersRepository({ mysql, logger })
const service = new UsersService({ repository })
const controller = new UsersController({ service })

router.get('/', authenticateMiddleware, controller.getAll.bind(controller))
router.get('/:userId', authenticateMiddleware, controller.getInfo.bind(controller))
router.get('/filtering/:filters', authenticateMiddleware, controller.getWithFilters.bind(controller))
// router.get('/search/:search', controller.getSearch.bind(controller))
//
router.post('/handler/add', authenticateMiddleware, postUserValidator(), validate, controller.post.bind(controller))
router.patch(
      '/handler/patch/:userId',
      authenticateMiddleware,
      patchUserValidator(),
      validate,
      controller.patch.bind(controller)
)

router.delete('/handler/delete/:userId', authenticateMiddleware, controller.delete.bind(controller))
router.patch('/handler/restore/:userId', authenticateMiddleware, controller.restore.bind(controller))

export default router
