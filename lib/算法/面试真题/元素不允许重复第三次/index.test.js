// const filterThird = require('./ans1')
const filterThird = require('./ans2')

describe(`filterThird`, () => {
  it(`test-1`, () => {
    expect(filterThird([1, 1, 1, 2, 2, 3])).toEqual([1, 1, 2, 2, 3]);
  });
  it(`test-2`, () => {
    expect(filterThird([1, 1, 1, 1, 2, 2, 3])).toEqual([1, 1, 2, 2, 3]);
  });
  it(`test-3`, () => {
    expect(filterThird([0, 0, 1, 1, 1, 1, 2, 3, 3])).toEqual([0, 0, 1, 1, 2, 3, 3]);
  });
});
