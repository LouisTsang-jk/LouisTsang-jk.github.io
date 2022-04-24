# 爬楼梯

## 出处

[leetcode ｜ 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

> 难度: 简单

## 题解/思路

### 动态规划

- 空间复杂度 O(1)
- 时间复杂度 O(n)

```
/**
* @param {number} n
* @return {number}
*/
var climbStairs = function (n) {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  const dp = {};
  dp[0] = dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
```
