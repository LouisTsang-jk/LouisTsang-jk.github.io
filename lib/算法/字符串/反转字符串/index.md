# 反转字符串


## 题目

[leetcode｜反转字符串](https://leetcode-cn.com/problems/reverse-string/)
> 难度: 简单

## 题解/思路

### 双指针
  - 空间复杂度O(1)
  - 时间复杂度O(n)
  ```
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
};
  ````
