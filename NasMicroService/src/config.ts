import appConfig from 'dotenv'

appConfig.config()

const config = () => {
    return {
        db: {
            connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_NAME,
            port: process.env.MYSQL_PORT
        },
        google: {}
    }
}

export default config()
