module.exports = function (fn, ctx, args) {
  ctx = ctx ? Object(ctx) : window;
  const key = Symbol();
  ctx[key] = fn;
  const res = ctx[key](...args);
  delete ctx[key];
  return res;
}