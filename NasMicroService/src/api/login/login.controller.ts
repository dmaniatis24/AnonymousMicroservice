import { Request, Response } from 'express'
import { getEnvVar } from '../../infrastructure/utilities/GetEnvVar'
import Token from '../../infrastructure/utilities/Token'

class LoginController {
      public service: any
      public logger: any
      private activity: string[] | any

      constructor(props: any) {
            this.service = props.service
            this.logger = props.service.logger
            this.activity = {
                  entity: 'user'
            }
            // this.logger.debug({ msg: 'Test Api ApiController', data: props })
      }

      async login(req: Request, res: Response, next?: any): Promise<any> {
            try {
                  console.log('Login Asked', JSON.stringify(new Date()))
                  //Clear all tokens
                  const tok = new Token()
                  res.clearCookie(<string>getEnvVar('UPLOAD_TOKEN'))
                  res.cookie(<string>getEnvVar('UPLOAD_TOKEN'), await tok.generateToken(getEnvVar('APP_SECRET')), {
                        //secure: this.environment === 'production',
                        httpOnly: true
                  })
                  return res.json({
                        res: {
                              loginNas: true
                        }
                  })
            } catch (myE: any) {
                  next(myE)
            }
      }

      async logout(req: Request, res: Response, next?: any): Promise<any> {
            try {
                  //Reset if was a simple user before
                  res.clearCookie(<string>getEnvVar('UPLOAD_TOKEN'))

                  return res.json({
                        res: { logout: true }
                  })
            } catch (myE: any) {
                  next(myE)
            }
      }
}

export default LoginController
