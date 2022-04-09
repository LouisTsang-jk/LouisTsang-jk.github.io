module.exports = function (self, ctx, ...args) {
  const fn = function (...params) {
    return self.call(ctx, ...args, ...params);
  }
  if (self.prototype) {
    fn.prototype = self.prototype;
  }
  return fn;
}