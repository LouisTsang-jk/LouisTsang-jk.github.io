# 最后一个单词的长度

## 题目
> [leetcode｜最后一个单词的长度](https://leetcode-cn.com/problems/length-of-last-word/)

## 答案
牛客网也有这题，但是测试用例不全，缺少n个空格结尾输入的测试用例。
```
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  if (!s.length) return 0;
  let num = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s.charAt(i) === ' ') {
      if (num === 0) {
        continue;
      } else {
        break;
      }
    } else {
      num++;
    }
  }
  return num;
};
```