const flat = require("./index");

describe(`测试flat函数`, () => {
  const testArr = [1, 2, [3], [4, 5, [6, [7]]], "", {}];
  it(`测试默认值: 打平一层`, () => {
    expect(flat(testArr)).toEqual(testArr.flat());
  });
  it(`测试depth: 2`, () => {
    expect(flat(testArr, 2)).toEqual(testArr.flat(2));
  });
  it(`测试depth: 3`, () => {
    expect(flat(testArr, 3)).toEqual(testArr.flat(3));
  });
});
