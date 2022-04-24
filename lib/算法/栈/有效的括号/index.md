# 有效的括号

## 出处

[leetcode ｜ 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

> 难度: 简单

## 题解/思路

### 栈

- 空间复杂度 O(n)
- 时间复杂度 O(n)

```
/**
* @param {string} s
* @return {boolean}
*/
var isValid = function (s) {
const arr = s.split('');
if (arr.length % 2) return false;
const reflect = {
  '(': ')',
  '{': '}',
  '[': ']'
}
const stack = [];
for (let i = 0; i < arr.length; i++) {
  const target = reflect[arr[i]]
  if (target) {
    stack.push(target)
  } else {
    if (arr[i] === stack[stack.length - 1]) {
      stack.pop();
    } else {
      return false;
    }
  }
}
return !stack.length;
};

```
