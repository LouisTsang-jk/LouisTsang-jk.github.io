# 每日温度

## 出处

[leetcode ｜ 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

> 难度: 中等


## 题解/思路

### 单调栈

- 空间复杂度 O(n)
- 时间复杂度 O(n)
  遍历的同时能确认某个值，这时候使用单调栈

```
/**
* @param {number[]} temperatures
* @return {number[]}
*/
var dailyTemperatures = function (temperatures) {
const stack = [];
const res = new Array(temperatures.length).fill(0);
for (let i = 0; i < res.length; i++) {
  while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
    const target = stack.pop();
    res[target] = i - target;
  }
  stack.push(i);
}
return res;
};
```
