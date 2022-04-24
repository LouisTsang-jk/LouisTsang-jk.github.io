# 删除字符串中的所有相邻重复项

## 出处

[leetcode ｜ 删除字符串中的所有相邻重复项](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

> 难度: 简单

## 题解/思路

### 栈匹配

- 空间复杂度 O(n)
- 时间复杂度 O(n)

```
/**
* @param {string} s
* @return {string}
*/
var removeDuplicates = function (s) {
const stack = []
for (const i of s) {
  if (stack.length && stack[stack.length - 1] === i) {
    stack.pop();
  } else {
    stack.push(i);
  }
}
return stack.join('')
};
```
