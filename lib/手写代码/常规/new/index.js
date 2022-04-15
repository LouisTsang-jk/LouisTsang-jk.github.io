module.exports = function _new (constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, args);
  return res instanceof Object ? res : obj;
}