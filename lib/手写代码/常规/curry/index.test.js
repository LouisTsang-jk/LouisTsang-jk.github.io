const curry = require("./index");

function sum (x, y, z) {
  return x + y + z;
}

const curryFn = curry(sum);

describe(`curry柯里化`, () => {
  it(`柯里化`, () => {
    expect(curryFn(1, 2, 3)).toEqual(6);
    expect(curryFn(1, 2)(3)).toEqual(6);
    expect(curryFn(1)(2, 3)).toEqual(6);
    expect(curryFn(1)(2)(3)).toEqual(6);
   })
})