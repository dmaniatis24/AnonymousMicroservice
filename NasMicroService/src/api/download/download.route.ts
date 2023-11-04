import { Router } from 'express'
import MySqlApp from '../../infrastructure/utilities/MySql'
import logger from '../../infrastructure/utilities/Logger'
import config from '../../config'
import DownloadRepository from './download.repository'
import DownloadService from './download.service'
import DownloadController from './download.controller'

const mysql = new MySqlApp({ logger: logger, options: config.db })
const router = Router()

const repository = new DownloadRepository({ mysql, logger })
const service = new DownloadService({ repository })
const controller = new DownloadController({ service })

router.get('/', controller.downloadFile.bind(controller))

export default router
