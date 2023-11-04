import {Connection} from 'mysql2'
import MySqlUtils from '../../infrastructure/utilities/MySql.utils'
import Helpers from '../../infrastructure/utilities/Helpers'

class EmailsRepository {
    private mysql: Connection
    private readonly table: string
    private logger: any
    private reportDepartmentsAssoc: string
    private departments: string

    constructor(props: any) {
        this.mysql = props.mysql
        this.logger = props.logger
        this.table = 'report'
        this.reportDepartmentsAssoc = 'report_departments_assoc'
        this.departments = 'departments'
        // this.logger.debug({ msg: 'Test Api Controller', data: this.mysql })
    }

}

export default EmailsRepository
