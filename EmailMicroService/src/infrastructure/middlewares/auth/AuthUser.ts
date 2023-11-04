import Token from '../../utilities/Token'
import { getEnvVar } from '../../utilities/GetEnvVar'

export const authenticateMiddleware = async (req: any, res: any, next: any) => {
    const tokenAdmin = req.cookies[<string>getEnvVar('ADMIN_TOKEN')]

    if (!tokenAdmin.token) {
        // const tokenUser = req.cookies[<string>getEnvVar('USER_TOKEN')]
        // if (!tokenUser) {
        //
        // }

        return res.status(401).json({ error: 'Unauthorized', message: 'Missing Token' })
    }

    const tok = new Token()
    if (!(await tok.validateToken(tokenAdmin.token))) {
        return res.status(401).json({ error: 'Forbidden', message: 'Invalid Token...' })
    }

    req.user = await tok.decodeToken(tokenAdmin.token)

    next()
}
