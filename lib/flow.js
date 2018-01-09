/* Classic flow */
module.exports = function flow(sequence, initialValue) {
  if (!sequence) {
    throw new TypeError('Sequence must be an array');
  }
  for (let i = 0; i < sequence.length; i++) {
    initialValue = sequence[i](initialValue);
  }
  return initialValue;
};
