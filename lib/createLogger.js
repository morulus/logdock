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

  /* Lazy define pipe */
  Object.defineProperty(logger, 'stream', {
    configurable: true,
    get         : () => {
      Object.defineProperty(logger, 'stream', {
        configurable: false,
        value       : unit.stream,
      });
      return unit.stream;
    },
  });

  const api = createLoggerApi();
  Object.assign(logger, api);
  return logger;
}

module.exports = createLogger;
