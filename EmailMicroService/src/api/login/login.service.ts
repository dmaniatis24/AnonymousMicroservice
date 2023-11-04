import Token from '../../infrastructure/utilities/Token'

class LoginService {
    private repository: any
    private logger: any

    constructor({ repository }: any) {
        this.repository = repository
        this.logger = repository.logger
        // this.logger.debug({ msg: 'Test Api Service Inside', data: { test: 'Ok' } })
    }

    async login(username: string, password: string) {
        const userExist = await this.repository.verifyUserExist(username, password)
        if (userExist.user && userExist.password) {
            const user = {
                userId: userExist.userInfo[0].userId,
                username: userExist.userInfo[0].username,
                email: userExist.userInfo[0].email,
                userType: userExist.userInfo[0].userType
            }

            const tok = new Token()
            const token = await tok.generateToken(user)
            return { login: true, token: token }
        } else {
            return { login: false }
        }
    }
}

export default LoginService
