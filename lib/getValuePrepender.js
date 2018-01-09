module.exports = function getValuePrepender(value, separator) {
  return function valuePrepender(str) {
    return value + separator + str;
  };
};
