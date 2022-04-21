const cal = require('./index')

describe(`测试`, () => {
  it(`test: abcabcbb`, () => {
    const str = 'abcabcbb'
    expect(cal(str)).toEqual(3);
  });
  it(`test: bbbbb`, () => {
    const str = 'bbbbb'
    expect(cal(str)).toEqual(1);
  });
  it(`test: pwwkew`, () => {
    const str = 'pwwkew'
    expect(cal(str)).toEqual(3);
  });
  it(`test: `, () => {
    const str = ''
    expect(cal(str)).toEqual(0);
  });
});