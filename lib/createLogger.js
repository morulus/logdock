const LoggerUnit = require('./LoggerUnit');
const createLoggerApi = require('./createLoggerApi');

function createLogger(parent, config) {
  const unit = parent ?
    parent.createUnit(config) :
    new LoggerUnit(config);

  const logger = function logger(...args) {
    unit.write(...args);
    return logger;
  };

  logger._unit = unit;
  logger._create = createLogger;

  const api = createLoggerApi();
  Object.assign(logger, api);
  return logger;
}

module.exports = createLogger;
