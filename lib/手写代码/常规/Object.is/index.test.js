const is = require('./index');

describe(`Object.is测试`, () => {
  it(`正负零`, () => {
    expect(is(+0, -0)).toEqual(Object.is(+0, -0));
   })
   it(`NaN`, () => {
    expect(is(NaN, NaN)).toEqual(Object.is(NaN, NaN));
   })
})