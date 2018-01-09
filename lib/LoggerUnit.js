const throttle = require('lodash.throttle');
const flatten = require('./flatten');
const invokeCompile = require('./invokeCompile');
const logUpdate = require('log-update');
const isFunction = require('./isFunction');
const arrayToFlow = require('./arrayToFlow');
const isArray = require('./isArray');

function LoggerUnit(config = {}) {
  /* Caches link to parent */
  this.parent = Object.getPrototypeOf(this);
  this.content = undefined;
  this.type = 'default';
  this.persisted = false;

  if (!(this.parent instanceof LoggerUnit)) {
    /* This code will be executed only for root logger */
    this.config = Object.assign({
      hideEmpty  : true, // Hide branches with empty message
      separator  : ' ', // Separator between messages
      updateLimit: 10 // Update limit in ms
    }, config || {});

    /* This is the place where I can define default internal API */
    this.parent = false;

    /* This is default output */
    this.output = config.output || logUpdate.create(config.stdout || process.stdout);

    /* Default transform */
    this.transform = function transform(content) {
      return content;
    };

    /* Default filter */
    this.filter = function filter(data) {
      return !!data;
    };

    /* Starge compile lifecycle of sequence */
    this.update = throttle(() => {
      const compiled = this.compile();
      if (compiled.length === 0) {
        if (this.output.clear) {
          this.output.clear();
        } else {
          this.stdout.write('');
        }
      } else {
        this.output(compiled.join('\n'));
      }
    }, this.config.updateLimit);
  } else {
    this.config = Object.create(this.parent.config);
    Object.assign(this.config, config || {});

    /* Specify compile and destroy to override parent own method */
    this.compile = LoggerUnit.prototype.compile;
    this.render = LoggerUnit.prototype.render;
    this.destroy = LoggerUnit.prototype.destroy;
    /* Add to the parent children list */
    this.parent.children.push(this);
  }

  /* Caches childrens */
  this.children = [];
}

LoggerUnit.prototype = {
  constructor: LoggerUnit,
  createUnit(config) {
    const nextUnit = Object.create(this);
    LoggerUnit.call(nextUnit, config);
    return nextUnit;
  },
  write(content) {
    if (this.disabled) {
      return;
    }

    this.persisted = false;

    if (this.content === content) {
      return;
    }

    this.content = content;

    this.update();
  },
  setTransform(transformer) {
    this.transform = isFunction(transformer) ?
      transformer : (
        arrayToFlow(isArray(transformer) ? transformer : [transformer])
      );
  },
  setFilter(filter) {
    if (typeof filter !== 'function') {
      throw new TypeError('Filter must be a function');
    }
    this.filter = filter;
  },
  renderContent() {
    return this.filter(this.content) ?
      this.transform(
        this.content
      ) :
      '';
  },
  render(children) {
    if (children && children.length) {
      /* Unit which has children units, can have own content */
      return children;
    }
    const value = this.renderContent();

    return this.isContentSubstantial(value) ? [value] : [];
  },
  /* Extract from children its contents */
  compileChildren() {
    return flatten(
      this.children
        .map(invokeCompile)
    );
  },
  /* Default compile */
  compile() {
    if (this.persisted) {
      return [];
    }
    return this.render(this.compileChildren());
  },
  /* Check result content substantiality. Includes config option .hideEmpty - the part of behavior when empty message hides all branch */
  isContentSubstantial(value) {
    if (this.config.hideEmpty) {
      return !!value;
    } else {
      return value === '' || value;
    }
  },
  removeChild(unit) {
    const targetIndex = this.children.findIndex(item => unit === item);
    if (targetIndex !== false) {
      this.children.splice(targetIndex, 1);
    } else {
      throw new Error('Unreachable child to remove');
    }

    if (this.disabled) {
      this.update();
    }
  },
  persistAll() {
    if (
      this.output &&
      this.output.done &&
      typeof this.output.done === 'function'
    ) {
      return this.output.done();
    }
  },
  persist(done) {
    if (this.persisted || this.disabled) {
      return;
    }

    // Compile current and child units
    let lastValue = this.compile();

    this.persisted = true;

    // Compile parent units
    let parent = this.parent;
    while (parent) {
      lastValue = parent.render(lastValue);
      parent = parent.parent;
    }

    if (done) {
      if (this.parent) {
        this.parent.removeChild(this);
        this.parent = null;
      }

      this.disabled = true;
    }

    // Clear current output
    if (
      this.output &&
      this.output.clear &&
      typeof this.output.clear === 'function'
    ) {
      this.output.clear();
    }

    // Static render
    this.output(lastValue.join('\n'));

    this.persistAll();

    // Update all again
    this.update();
  },
  done(lastMessage) {
    if (arguments.length > 0 && lastMessage) {
      this.write(lastMessage);
    }
    this.persist(true);
  },
  destroy() {
    if (this.parent) {
      this.parent.removeChild(this);
      this.parent.destroy();
      this.parent = null;
    }
  }
};

module.exports = LoggerUnit;
