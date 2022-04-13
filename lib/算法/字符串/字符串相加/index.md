# 字符串相加

## 题目

[字符串相加 | leetcode](https://leetcode-cn.com/problems/add-strings/)

> 难度: 简单

## 题解/思路

### 遍历
1. num的位数可能不一样，所以需要补零
2. 从个位数开始遍历，sum大于9则下一位计算需要进位加1

- 空间复杂度 O(1)
- 时间复杂度 O(n)

```
/**
* @param {string} num1
* @param {string} num2
* @return {string}
*/
var addStrings = function (num1, num2) {
while (num1.length > num2.length) num2 = '0' + num2
while (num1.length < num2.length) num1 = '0' + num1
let flag = false;
let result = ''
for (let i = num1.length - 1; i >= 0; i--) {
  let sum = +num1[i] + +num2[i];
  if (flag) {
    sum++;
    flag = false;
  }
  if (sum > 9) {
    flag = true;
    sum -= 10;
  }
  result = sum + result;
}
if (flag) {
  result = '1' + result;
}
return result;
};
```
