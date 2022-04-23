const asyncPool = require("./index");

describe(`Test AsyncPool`, () => {
  it(`test`, (done) => {
    const result = [];
    const timeout = (i) =>
    new Promise((resolve) => {
      setTimeout(() => {
        result.push(i);
        resolve(i);
      }, i);
    });
    asyncPool(2, [100, 500, 300, 200], timeout);
    setTimeout(() => {
      expect(result).toEqual([100]);
    }, 200)
    setTimeout(() => {
      expect(result).toEqual([100, 300]);
    }, 450)
    setTimeout(() => {
      expect(result).toEqual([100, 300, 500, 200]);
      done();
    }, 700)
  });
});