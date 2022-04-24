# 柠檬水找零

## 出处

[leetcode ｜ 柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/)

> 难度: 简单

## 题解/思路

### 贪心

- 空间复杂度 O(1)
- 时间复杂度 O(n)

```
/**
* @param {number[]} bills
* @return {boolean}
*/
var lemonadeChange = function (bills) {
if (!bills.length) return true;
let d5 = 0;
let d10 = 0;
for (let i = 0; i < bills.length; i++) {
  if (bills[i] === 5) {
    d5++;
    continue;
  };
  if (bills[i] === 10) {
    d5--;
    d10++;
  }
  if (bills[i] === 20) {
    if (d10 > 0) {
      d10--;
      d5--;
    } else {
      d5 -= 3;
    }
  }
  if (d5 < 0) {
    return false;
  }
}
return true;
};
```
