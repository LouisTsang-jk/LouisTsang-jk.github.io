module.exports = function curry (fn, ...args) {
  return function (...params) {
    const input = [...args, ...params];
    if (input.length < fn.length) {
      return curry.call(this, fn, ...input);
    }
    return fn.apply(this, input);
  }
}