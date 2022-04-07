const _instanceof = require("./index");

function A () {}
const a = new A();

const strLiterals = 'strLiterals';
const strConstructor = new String();

const objectLiterals = {};
const objectcreate = Object.create(null);

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

  it("字面量strLiterals的原型链上是否有String构造函数", () => {
    expect(_instanceof(strLiterals, String)).toEqual(false);
  });

  it("实例strConstructor的原型链上是否有String构造函数", () => {
    expect(_instanceof(strConstructor, String)).toEqual(true);
  });

  it("实例strConstructor的原型链上是否有String构造函数", () => {
    expect(_instanceof(strConstructor, String)).toEqual(true);
  });

  it("objectLiterals的原型链上是否有Object构造函数", () => {
    expect(_instanceof(objectLiterals, Object)).toEqual(true);
  });

  it("objectcreate的原型链上是否有Object构造函数", () => {
    expect(_instanceof(objectcreate, Object)).toEqual(false);
  });
});
