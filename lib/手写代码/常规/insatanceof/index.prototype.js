Object.prototype.instanceof = function (constructor) {
  let obj = this;
  while (true) {
    if (obj.__proto__ === null) {
      return false;
    }
    if (obj.__proto__ === constructor.prototype) {
      return true;
    }
    obj = obj.__proto__;
  }
};

function A () {}
const a = new A();
console.log(a.instanceof(Array)) // false
console.log(a.instanceof(A)) // true