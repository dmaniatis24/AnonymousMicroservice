import { Request, Response } from 'express'
import { getEnvVar } from '../../infrastructure/utilities/GetEnvVar'
import Token from '../../infrastructure/utilities/Token'

class ReportController {
      public service: any
      public logger: any
      private activity: string[] | any

      constructor(props: any) {
            this.service = props.service
            this.logger = props.service.logger
            this.activity = {
                  entity: 'report'
            }
            // this.logger.debug({ msg: 'Test Api ApiController', data: props })
      }

      async post(req: Request, res: Response, next?: any) {
            try {
                  return res.json({
                        res: await this.service.sendEmailTo(req.body)
                  })
            } catch (myE: any) {
                  next(myE)
            }
      }
}

export default ReportController
