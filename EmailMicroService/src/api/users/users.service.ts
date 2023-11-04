import Users from './users.model'
import GenerateIds from '../../infrastructure/utilities/GenerateIds'
import Encryption from '../../infrastructure/utilities/Encryption'
import { getEnvVar } from '../../infrastructure/utilities/GetEnvVar'

class UsersService {
    private repository: any
    private logger: any

    constructor({ repository }: any) {
        this.repository = repository
        this.logger = repository.logger
        // this.logger.debug({ msg: 'Test Api Service Inside', data: { test: 'Ok' } })
    }

    async retrieve() {
        return await this.repository.retrieveAll()
    }

    async retrieveWithFilter(filters = {}, whereAnd = true) {
        return await this.repository.retrieveWithFilter(filters, whereAnd)
    }

    async insert(payload: string | any) {
        const genId = new GenerateIds({
            mysql: this.repository.mysql,
            logger: this.logger,
            table: 'user',
            id: 'userId',
            prefix: 'USR'
        })
        payload.userId = await genId.generateId()
        const enc = new Encryption()
        payload.password = await enc.hashPassword(getEnvVar('DEFAULT_PASSWORD') ?? '123456')
        const dat = Users(payload)
        return await this.repository.insert(dat)
    }

    async update({ filters, attrs }: any) {
        return await this.repository.update({ filters, attrs })
    }

    async delete(filters: any) {
        return await this.repository.update({ filters, attrs: { deletedAt: new Date(), isDeleted: 1 } })
    }

    async restore(filters: any) {
        return await this.repository.restore({ filters, attrs: { deletedAt: null, isDeleted: null } })
    }
}

export default UsersService
