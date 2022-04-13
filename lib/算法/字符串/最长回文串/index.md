# 最长回文串

## 题目

[leetcode ｜ 最长回文串](https://leetcode-cn.com/problems/longest-palindrome/)

> 难度: 简单

给定一个包含大写字母和小写字母的字符串  s ，返回   通过这些字母构造成的 最长的回文串  。

在构造过程中，请注意 区分大小写 。比如  "Aa"  不能当做一个回文字符串。

## 题解/思路

### hash 表

- 空间复杂度 O(1)
- 时间复杂度 O(n)
1. 如果一个字符出现次数超过两次，那最大回文数肯定会增加
2. 最后判断如果字符串长度为奇数则有一个字符可以作为中间节点，最终counter加1
```
/**
* @param {string} s
* @return {number}
*/
var longestPalindrome = function (s) {
  if (s.length === 1) return 1;
  const reflect = {};
  for (let i = 0; i < s.length; i++) {
    if (reflect[s[i]]) {
      reflect[s[i]]++;
    } else {
      reflect[s[i]] = 1;
    }
  }
  let counter = 0;
  Object.keys(reflect).forEach(key => {
    counter += parseInt((reflect[key] / 2), 10) * 2;
  })
  return counter < s.length ? counter + 1 : counter;
};
```
