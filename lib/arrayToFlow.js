const flow = require('./flow');
const isFunction = require('./isFunction');

module.exports = function arrayToFlow(arrayOfFn) {
  const fnsOnly = arrayOfFn.filter(isFunction);
  if (fnsOnly.length !== arrayOfFn.length) {
    const badItems = arrayOfFn.filter(item => !isFunction(item));
    throw new Error('Each element in the transform sequence must be a function, but at least ' + badItems.length + ' item has wrong type');
  }

  return function functionFlow(operand) {
    return flow(arrayOfFn, operand);
  };
};
