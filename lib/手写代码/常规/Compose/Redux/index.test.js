const compose = require("./index");

describe(`Redux Compose Test`, () => {
  it(`test`, () => {
    function A(...args) {
      return args;
    }
    function B(...args) {
      return args;
    }
    const funcs = compose([A, B]);
    expect(funcs(1, 2)).toEqual([[1, 2]]);
  });
});
