import { Connection } from 'mysql2'
import MySqlUtils from '../../infrastructure/utilities/MySql.utils'
import Encryption from '../../infrastructure/utilities/Encryption'

class DownloadRepository {
      private mysql: Connection
      private readonly table: string
      private logger: any

      constructor(props: any) {
            this.mysql = props.mysql
            this.logger = props.logger
            this.table = 'user'
            // this.logger.debug({ msg: 'Test Api Controller', data: this.mysql })
      }

      async download(username: string, password: string) {}
}

export default DownloadRepository
