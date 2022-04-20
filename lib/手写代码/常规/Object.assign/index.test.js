const assign = require("./index");

describe(`Object.assign`, () => {
  const target = {};
  const source1 = {
    a: 1,
  };
  const source2 = {
    [Symbol("b")]: 2,
  };
  const result1 = Object.assign(target, source1, source2);
  const result2 = assign(target, source1, source2);
  it(`target应该与返回一致`, () => {
    expect(result1).toEqual(target);
  });
  it(`基本功能: 合并对象`, () => {
    expect(result2).toEqual(target);
  });
});
