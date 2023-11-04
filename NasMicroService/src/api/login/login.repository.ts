import { Connection } from 'mysql2'
import MySqlUtils from '../../infrastructure/utilities/MySql.utils'
import Encryption from '../../infrastructure/utilities/Encryption'

class LoginRepository {
    private mysql: Connection
    private readonly table: string
    private logger: any

    constructor(props: any) {
        this.mysql = props.mysql
        this.logger = props.logger
        this.table = 'user'
        // this.logger.debug({ msg: 'Test Api Controller', data: this.mysql })
    }

    async verifyUserExist(username: string, password: string) {
        try {
            const results: any = await this.mysql.query(
                `SELECT COUNT(username) as cc FROM ${this.table} where username = '${username}'`
            )
            if (results.res[0].cc === 1) {
                if (await this.verifyUserPassword(username, password)) {
                    const userInfo: any = await this.mysql.query(
                        `SELECT * FROM ${this.table} where username = '${username}'`
                    )
                    return {
                        user: true,
                        password: true,
                        userInfo: userInfo.res
                    }
                } else {
                    return {
                        error: {
                            message: 'Password incorrect',
                            user: true,
                            password: false
                        }
                    }
                }
            } else {
                return {
                    error: {
                        message: 'User not found',
                        username: username,
                        password: null
                    }
                }
            }
        } catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error })
            return {
                error: error
            }
        }
    }

    async verifyUserPassword(username: string, password: string) {
        try {
            const results: any = await this.mysql.query(
                `SELECT username,password FROM ${this.table} where username = '${username}'`
            )
            const passwordDb = results.res[0]
            const enc = new Encryption()
            return await enc.verifyPassword(password, passwordDb.password)
        } catch (error) {
            this.logger.error({ error: this.constructor.name + ' verifyUserPassword Error', data: error })
            return {
                error: error
            }
        }
    }
}

export default LoginRepository
