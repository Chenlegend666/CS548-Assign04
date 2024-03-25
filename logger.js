const winston = require('winston');
const { format, transports } = winston;
const { DateTime } = require('luxon');

const logFormat = format.printf(({level,message}) => {
    const dataFormat = DateTime.now().toUTC()
    return `{time:${dataFormat}, level:${level}, message:${message}}`
})

const getLoggerInstance = () => {
    const logger =  winston.createLogger({
        level: 'info', // info, warn, error, debug
        format: format.json(),
        transports:
        [
            new transports.Console({format: format.combine(format.colorize(),logFormat)})
        ]

    });
    return logger;
}

module.exports = { getLoggerInstance };
