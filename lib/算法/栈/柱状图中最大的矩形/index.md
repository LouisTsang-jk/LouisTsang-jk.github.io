# 柱状图中最大的矩形

## 出处

[柱状图中最大的矩形 ｜ leetcode](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

> 难度: 困难

## 题解/思路

### 单调递增栈 + 哨兵

- 空间复杂度 O(n)
- 时间复杂度 O(n)
这里要理解几点：
  1. 栈存放的是索引
  2. 遍历时确认的是当前遍历柱体的高度的面积，所以高度是不变的情况下看是否能向右扩张(因为单调递增，所以左边忽略)
  3. 哨兵可以让我们忽略栈空或者栈中还有剩余柱子的问题

```
/**
* @param {number[]} heights
* @return {number}
*/
var largestRectangleArea = function (heights) {
let maxArea = 0;
// 栈存储索引
const stack = [];
// 哨兵
heights = [0, ...heights, 0];
for (let i = 0; i < heights.length; i++) {
  // 栈循环
  while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
    maxArea = Math.max(maxArea, heights[stack.pop()] * (i - stack[stack.length - 1] - 1));
  }
  stack.push(i);
}
return maxArea;
};
```
