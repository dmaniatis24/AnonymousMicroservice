import { Connection } from 'mysql2'
import Helpers from './Helpers'

class GenerateIds {
    private mysql: Connection
    private logger: any
    private table: string
    private id: string | any
    private prefix: string | any

    constructor(props: any) {
        this.mysql = props.mysql
        this.logger = props.logger
        this.prefix = props.prefix
        this.table = props.table
        this.id = props.id
    }

    async generateId() {
        try {
            const hel = new Helpers()

            const idDate = hel.generateCurrentDate()
            const idLetters = hel.generateRandomString(3)
            const idNumbers = hel.generateRandomNumber()

            let id = this.prefix + idDate + idLetters + idNumbers

            while (await this.searchForId(id)) {
                id = this.prefix + idDate + idLetters + idNumbers
            }
            return id
        } catch (myE) {
            this.logger.error({ error: this.constructor.name + ' Error', data: myE })
        }
    }

    async generateUserReportId() {
        try {
            const hel = new Helpers()

            const idLetters1 = hel.generateRandomString(3)
            const idLetters2 = hel.generateRandomString(2)
            const idNumbers = hel.generateRandomNumber()

            let id = this.prefix + idLetters1 + idNumbers + idLetters2

            while (await this.searchForId(id)) {
                id = this.prefix + idLetters1 + idNumbers + idLetters2
            }
            return id
        } catch (myE) {
            this.logger.error({ error: this.constructor.name + ' Error', data: myE })
        }
    }

    async generateUserIdForReport() {
        try {
            const hel = new Helpers()

            const idLetters1 = hel.generateRandomString(3)
            const idLetters2 = hel.generateRandomString(2)
            const idNumbers = hel.generateRandomNumber()

            let id = this.prefix + idLetters1 + idNumbers + idLetters2

            while (await this.searchForId(id)) {
                id = this.prefix + idLetters1 + idNumbers + idLetters2
            }
            return id
        } catch (myE) {
            this.logger.error({ error: this.constructor.name + ' Error', data: myE })
        }
    }

    async searchForId(id: string) {
        try {
            const results: any = await this.mysql.query(`SELECT * FROM ${this.table} WHERE ${this.id} = '${id}'`)
            if (results.count === 0) {
                return false
            } else {
                return true
            }
        } catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error })
        }
    }
}

export default GenerateIds
