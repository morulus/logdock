const getValuePrepender = require('../getValuePrepender');

module.exports = function render(childLogs) {
  if (childLogs && childLogs.length) {
    return childLogs.map(
      getValuePrepender(this.renderContent(), this.config.separator)
    );
  } else {
    /* We do not return any content, if context childs are empty */
    return [];
  }
};
