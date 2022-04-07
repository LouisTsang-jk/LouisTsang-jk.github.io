// Object.prototype.instanceof = function (constructor) {
//   let obj = this;
//   while (true) {
//     if (obj.__proto__ === null) {
//       return false;
//     }
//     if (obj.__proto__ === constructor.prototype) {
//       return true;
//     }
//     obj = obj.__proto__;
//   }
// };

// function A () {}
// const a = new A();
// console.log(a.instanceof(Array)) // false
// console.log(a.instanceof(A)) // true

module.exports = function flat (arr, depth = 1) {
  if (depth === 0) return arr;
  return arr.reduce((acc, cur) => {
      if (Array.isArray(cur) && depth) {
          return acc = [...acc, ...flat(cur, depth - 1)]
      } else {
          return acc = [...acc, cur];
      }
  }, [])
}
