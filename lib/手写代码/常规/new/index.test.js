const _new = require("./index");

describe(`测试模拟new`, () => {
  it(`构造函数返回非对象`, () => {
    function A() {
      return 1;
    }
    expect(_new(A)).toEqual(new A());
  });
  it(`构造函数返回对象`, () => {
    function B(name) {
      return {
        name,
        node: 2,
      };
    }
    expect(_new(B, "louis")).toEqual(new B("louis"));
  });
});
