const bubbleSort = require("./冒泡排序/index");
const quickSort = require("./快速排序/index");
const selectionSort = require("./快速排序/index");

const arr = [3, 2, 5, 3, 6, 8, 3, 0, -1, 11, 24];
const ans = arr.sort((a, b) => a - b);

describe(`排序算法`, () => {
  it(`冒泡排序`, () => {
    expect(bubbleSort(arr)).toEqual(ans);
  });
  it(`快速排序`, () => {
    expect(quickSort(arr)).toEqual(ans);
  });
  it(`选择排序`, () => {
    expect(selectionSort(arr)).toEqual(ans);
  });
});
