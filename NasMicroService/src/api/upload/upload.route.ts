import { Router } from 'express'
import MySqlApp from '../../infrastructure/utilities/MySql'
import logger from '../../infrastructure/utilities/Logger'
import config from '../../config'
import UploadRepository from './upload.repository'
import UploadService from './upload.service'
import UploadController from './upload.controller'
import { getEnvVar } from '../../infrastructure/utilities/GetEnvVar'

const multer = require('multer')
const path = require('path')
const fs = require('fs')
const mysql = new MySqlApp({ logger: logger, options: config.db })
const router = Router()

const repository = new UploadRepository({ mysql, logger })
const service = new UploadService({ repository })
const controller = new UploadController({ service })

const rootFolder = getEnvVar('UPLOAD_PATH')

const storage = multer.diskStorage({
      destination: (req: any, file: any, cb: any) => {
            const fs = require('fs')
            const folderName = rootFolder + req.query.folder
            if (!fs.existsSync(rootFolder)) {
                  fs.mkdirSync(rootFolder)
            }

            if (!fs.existsSync(folderName)) {
                  fs.mkdirSync(folderName)
                  console.log(`Folder '${folderName}' created successfully.`)
            } else {
                  console.log(`Folder '${folderName}' already exists.`)
            }

            cb(null, rootFolder + req.query.folder)
      },
      filename: (req: any, file: any, cb: any) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const extname = path.extname(file.originalname)
            cb(null, file.fieldname + '-' + uniqueSuffix + extname)
      }
})

const upload = multer({ storage })

router.post('/', upload.single('file'), controller.uploadFile.bind(controller))

export default router
