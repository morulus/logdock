function isArray(arrayLike) {
  return typeof arrayLike === 'object' &&
    arrayLike instanceof Array;
}

module.exports = function animate(frames, minDelay = 33, onFinish) {
  if (!frames || !isArray(frames)) {
    throw new TypeError('Frames must be an array');
  }
  let i = -1;
  let initTime;
  return () => {
    const currentTime = new Date().getTime();
    if (initTime === undefined) {
      initTime = currentTime;
    }
    const diff = currentTime - initTime;
    i = Math.round(diff / minDelay);

    if (i >= frames.length) {
      initTime = currentTime;
      i = 0;
      if (onFinish) {
        onFinish(diff);
      }
    }
    return typeof frames[i] === 'function' ?
      frames[i]() : frames[i];
  };
};
