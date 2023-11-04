import { Connection } from 'mysql2'
import MySqlUtils from '../../infrastructure/utilities/MySql.utils'
import Helpers from '../../infrastructure/utilities/Helpers'

class UsersRepository {
    private mysql: Connection
    private readonly table: string
    private logger: any
    private departmentsUserAssoc: string
    private departments: string
    private keys: {
        assocNameAssocKey: string
        assocNameKey: string
        assocKey: string
        mainKey: string
        assocNameForArray: string
    }

    constructor(props: any) {
        this.mysql = props.mysql
        this.logger = props.logger
        this.table = 'user'
        this.departmentsUserAssoc = 'departments_user_assoc'
        this.departments = 'departments'
        this.keys = {
            mainKey: 'userId',
            assocNameForArray: 'departments',
            assocKey: 'departmentId',
            assocNameAssocKey: 'departmentName',
            assocNameKey: 'department'
        }
        // this.logger.debug({ msg: 'Test Api Controller', data: this.mysql })
    }

    async retrieveAll() {
        try {
            const resultsUser: any = await this.mysql.query(`SELECT * FROM ${this.table}`)
            const resultsDepartmentUserAssoc: any = await this.mysql.query(
                `SELECT * FROM ${this.departmentsUserAssoc} inner join ${this.departments} on ${this.departmentsUserAssoc}.departmentId = ${this.departments}.departmentId`
            )

            const hel = new Helpers()

            return {
                users: await hel.mergeAssociativeArrays(resultsUser, resultsDepartmentUserAssoc, this.keys)
            }
        } catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error })
            return {
                error: error
            }
        }
    }

    async retrieveWithFilter(filters: any, whereAnd = true) {
        try {
            this.logger.debug({ msg: this.constructor.name + ' Filters', data: filters })
            const whereGen = new MySqlUtils()
            const [where, values] = whereGen.generateWhereStatement(filters, whereAnd)
            console.log('whereStatment::' + where)

            const resultsUser = await this.mysql.query(`SELECT * FROM ${this.table} WHERE ${where}`, values)
            const resultsDepartmentUserAssoc: any = await this.mysql.query(
                `SELECT * FROM ${this.departmentsUserAssoc} inner join ${this.departments} on ${this.departmentsUserAssoc}.departmentId = ${this.departments}.departmentId`
            )
            const hel = new Helpers()

            return {
                users: await hel.mergeAssociativeArrays(resultsUser, resultsDepartmentUserAssoc, this.keys)
            }
        } catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error })
            return {
                error: error
            }
        }
    }

    async insert(payload: string | any) {
        try {
            const insertGen = new MySqlUtils()
            const [cols, qMarks, values] = insertGen.extractInsertPreparedStatements(payload)
            const result = await this.mysql.query(`INSERT INTO ${this.table} (${cols}) VALUES (${qMarks})`, values)

            return {
                createdEntityId: result
            }
        } catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error })
            return {
                error: error
            }
        }
    }

    async update({ filters, attrs }: any) {
        try {
            attrs['updatedAt'] = new Date()
            const mysqlUtils = new MySqlUtils()
            const [where, filterValues] = mysqlUtils.generateWhereStatement(filters)
            const [colsWithQs, updateValues] = mysqlUtils.extractUpdatePreparedStatements(attrs)
            const result = await this.mysql.query(
                `UPDATE ${this.table} SET ${colsWithQs} WHERE ${where} AND deletedAt IS NULL`,
                updateValues.concat(filterValues)
            )
            return {
                id: filterValues,
                updatedEntities: result
            }
        } catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error })
            return {
                error: error
            }
        }
    }

    async restore({ filters, attrs }: any) {
        try {
            attrs['updatedAt'] = new Date()
            const mysqlUtils = new MySqlUtils()
            const [where, filterValues] = mysqlUtils.generateWhereStatement(filters)
            const [colsWithQs, updateValues] = mysqlUtils.extractUpdatePreparedStatements(attrs)
            const result = await this.mysql.query(
                `UPDATE ${this.table} SET ${colsWithQs} WHERE ${where} `,
                updateValues.concat(filterValues)
            )
            return {
                id: filterValues,
                updatedEntities: result
            }
        } catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error })
            return {
                error: error
            }
        }
    }
}

export default UsersRepository
