const path = require('path');
const winstonLog = require('winston');

const logger = winstonLog.createLogger({
    level: 'error',
    format: winstonLog.format.json(),
    transports: [
      new winstonLog.transports.File({ filename: path.resolve(__dirname, 'logs/error.log'), level: 'error' })
    ]
});

module.exports = logger;