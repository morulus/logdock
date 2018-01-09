module.exports = function memoize(fn) {
  let cachedPayload;
  let cachedResult;
  let pristine = true;
  const context = this;
  return function memoizedFn() {
    const payload = arguments[0];
    if (!pristine && cachedPayload === payload) {
      return cachedResult;
    }
    pristine = false;
    cachedResult = fn.apply(context, arguments);
    cachedPayload = payload;
    return cachedResult;
  };
};
