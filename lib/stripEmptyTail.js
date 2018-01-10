module.exports = function stripEmptyTail(str) {
  return str.replace(/[\n]?$/, '');
};
