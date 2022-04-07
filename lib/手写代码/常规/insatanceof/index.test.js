const _instanceof = require("./index");

function A () {}
const a = new A();

describe("instanceof测试", () => {
  it("构造函数A的原型链上是否有Function构造函数", () => {
    // A.__proto__ === Function.prototype
    expect(_instanceof(A, Function)).toEqual(true);
  });

  it("a实例的原型链上是否有A构造函数", () => {
    // a.__proto__ === A.prototype
    expect(_instanceof(a, A)).toEqual(true);
  });
  it("a实例的原型链上是否有Object构造函数", () => {
    // a.__proto__.__proto__ === Object.prototype
    expect(_instanceof(a, Object)).toEqual(true);
  });

  it("a实例的原型链上是否有Array构造函数", () => {
    expect(_instanceof(a, Array)).toEqual(false);
  });
});
