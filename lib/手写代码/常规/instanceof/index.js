module.exports = (left, right) => {
  const type = typeof(left)
  // 字面量不算实例
  if (!['object', 'function'].includes(type)) return false;
  // Object.create(null)创建非 Object 实例
  if ((type === 'object') && (left.__proto__ === undefined)) return false;
  while (true) {
    if (left.__proto__ === null) return false;
    if (left.__proto__ === right.prototype) return true
    left = left.__proto__;
  }
}