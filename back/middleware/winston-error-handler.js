const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: './logs/error.log' })
  ]
});

module.exports = (err, req, res, next) => {
  logger.error(err.message, { meta: err });

  res.status(500).json({ error: 'Internal Server Error' });
};