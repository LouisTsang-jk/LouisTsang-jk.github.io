# 验证回文串

## 题目

[leetcode｜验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

> 难度: 简单

## 题解/思路

### 双指针
1. 使用正则，处理掉特殊字符
2. 双指针判断是否是回文

- 空间复杂度 O(1)
- 时间复杂度 O(s.length)

```
/**
* @param {string} s
* @return {boolean}
*/
var isPalindrome = function (s) {
s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
let left = 0;
let right = s.length - 1;
while (left < right) {
  if (s[left] !== s[right]) return false;
  left++;
  right--;
}
return true;
};
```
