import { Request, Response } from 'express'
import { getEnvVar } from '../../infrastructure/utilities/GetEnvVar'
import Token from '../../infrastructure/utilities/Token'

class UploadController {
      public service: any
      public logger: any

      constructor(props: any) {
            this.service = props.service
            this.logger = props.service.logger
            // this.logger.debug({ msg: 'Test Api ApiController', data: props })
      }

      async uploadFile(req: any, res: Response, next?: any): Promise<any> {
            try {
                  if (req.file) {
                        const response = {
                              filename: req.file.filename,
                              originalname: req.file.originalname,
                              url: `/${getEnvVar('UPLOAD_PATH')}/${req.query.folder}/${req.file.filename}`,
                              path: req.file.filename
                        }
                        return res.json({ uploaded: true, message: 'File uploaded successfully', file: response })
                  } else {
                        res.status(400).json({ message: 'File upload failed' })
                  }
            } catch (myE: any) {
                  next(myE)
            }
      }
}

export default UploadController
