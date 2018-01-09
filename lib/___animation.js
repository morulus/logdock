module.exports = function animate(sequence, minDelay = 10) {
  let i = -1;
  let lastTime = 0;
  return () => {
    const currentTime = new Date().getTime();
    if (lastTime < currentTime - minDelay) {
      i++;
      lastTime = currentTime;
    }

    if (i >= sequence.length) {
      i = 0;
    }
    return sequence[i];
  };
};
