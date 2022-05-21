// 简单将注释后 log: 的内容输出到控制台
module.exports = function (source) {
  return source.replace(/\/\/ log: (.+)/gm, "console.log('$1')");
}
