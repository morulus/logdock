const animate = require('cine');
const contextApi = require('./contextApi');

const api = {
  /* Classic log, but with context of logdock */
  log: function log(message) {
    return this._unit.persist(false, message);
  },
  create: function create() {
    return this._create(this._unit);
  },
  stdout: function stdout(stream) {
    const logger = this._create(null, {
      stdout: stream
    });

    return logger;
  },

  /* Set additional output */
  output: function output(userOutput) {
    const logger = this._create(null, {
      output: userOutput
    });

    return logger;
  },

  config: function config(cfg) {
    return this._create(this._unit, cfg);
  },

  done: function done(lastMessage) {
    return this._unit.done(lastMessage);
  },

  persist: function persist() {
    return this._unit.persist();
  },

  persistAll: function persistAll() {
    return this._unit.persistAll();
  },

  /* Create transform unit, which prodives transform function to each nested
   * child render function */
  transform: function transform(transformer) {
    const logger = this._create(this._unit);
    logger._unit.setTransform(transformer);

    logger._unit.type = 'transform';

    return logger;
  },

  /* Create group */
  group: function group(content, transform) {
    if (transform) {
      return this.transform(transform)
        .group(content);
    }

    const nextUnit = this._unit.createUnit();

    nextUnit.type = 'context';

    /* Forcibly append content */
    nextUnit.content = content;

    /* Override unit api with  */
    Object.assign(nextUnit, contextApi);

    /* Selfclosure for easy to get context from any child */
    nextUnit.context = nextUnit;

    /* After creating context unit, I should append simple unit */
    return this._create(nextUnit);
  },

  /* Allows you to specify inline messages separator */
  separator(separator) {
    const nextLoger = this._create(this._unit, {
      separator
    });

    return nextLoger;
  },

  getContext() {
    return this._unit.context;
  },

  destroy() {
    return this._unit.destroy();
  },

  clear() {
    this._unit.clear();

    return this;
  },

  animate(frames, interval) {
    const next = this.config({
      hideEmpty: false,
    }).group('').config({
      hideEmpty: true,
    });

    const animation = animate(frames, interval);
    const timer = setInterval(() => {
      next.getContext().write(animation());
    }, interval || 100);

    next.stop = function stop() {
      clearInterval(timer);
    };

    return next;
  }
};

module.exports = function createLogger() {
  return api;
};
