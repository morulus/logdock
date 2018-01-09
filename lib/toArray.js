const isArray = require('./isArray');

module.exports = function toArray(arrayLike) {
  return isArray(arrayLike) ? arrayLike : [arrayLike];
};
