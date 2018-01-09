const isArray = require('./isArray');

/* Reduce handler: flatten 2m array */
function flattenReducer(memo, perhabsArray) {
  return (memo || []).concat(isArray(perhabsArray) ? perhabsArray : [perhabsArray]);
}

module.exports = function(array) {
  return array.reduce(flattenReducer, []);
};
