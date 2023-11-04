import pino from 'pino'

const logger = pino({
    colorize: true,
    level: 'debug',
    transport: {
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        target: 'pino-pretty'
    }
})

export default logger
