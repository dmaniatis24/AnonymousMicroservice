import { Request, Response } from 'express'
import { getEnvVar } from '../../infrastructure/utilities/GetEnvVar'

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
            //Clear all tokens
            res.clearCookie(<string>getEnvVar('USER_TOKEN'))
            res.clearCookie(<string>getEnvVar('ADMIN_TOKEN'))

            const username = req.body.username
            const password = req.body.password
            const result = await this.service.login(username, password)
            console.log('result:::', result)
            if (result.token) {
                //Set the new token
                res.cookie(<string>getEnvVar('ADMIN_TOKEN'), result, {
                    //secure: this.environment === 'production',
                    httpOnly: true
                })
                return res.json({
                    res: {
                        login: true,
                        token: result
                    }
                })
            } else {
                return res.json({
                    res: {
                        login: false
                    }
                })
            }
        } catch (myE: any) {
            next(myE)
        }
    }

    async logout(req: Request, res: Response, next?: any): Promise<any> {
        try {
            //Reset if was a simple user before
            res.clearCookie(<string>getEnvVar('USER_TOKEN'))
            res.clearCookie(<string>getEnvVar('ADMIN_TOKEN'))

            return res.json({
                res: { logout: true }
            })
        } catch (myE: any) {
            next(myE)
        }
    }
}

export default LoginController
