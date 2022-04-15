const bubbleSort = require('./index')
describe(`冒泡排序`, () => {
  it(`排序测试`, () => {
    const arr = [3, 2, 5, 3, 6, 8, 3, 0, -1, 11, 24];
    expect(bubbleSort(arr)).toEqual(arr.sort((a, b) => a - b));
   })
})