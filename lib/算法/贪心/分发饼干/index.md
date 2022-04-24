# 分发饼干

## 出处

[leetcode ｜ 分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

> 难度: 简单

## 题解/思路

### 贪心

- 空间复杂度 O(mlogm + nlogn)
- 时间复杂度 O(logm + logn)

```
/**
* @param {number[]} g
* @param {number[]} s
* @return {number}
*/
var findContentChildren = function (g, s) {
g = g.sort((a, b) => a - b); // [7,8,9,10]
s = s.sort((a, b) => a - b); // [5,6,7,8]
let gi = 0;
let si = 0;
while (gi < g.length && si < s.length) {
  if (s[si] >= g[gi]) {
    gi++;
    si++;
  } else {
    si++;
  }
}
return gi;
};
```
