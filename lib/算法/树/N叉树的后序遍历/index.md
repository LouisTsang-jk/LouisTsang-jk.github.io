# N 叉树的后序遍历

## 出处

[leetcode ｜ N叉树的后序遍历](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/)

> 难度: 简单

## 题解/思路

### 递归

- 空间复杂度 O(1)
- 时间复杂度 O(n)
  这里要注意 for 循环里面是递归

```
/**
* // Definition for a Node.
* function Node(val,children) {
*    this.val = val;
*    this.children = children;
* };
*/

/**
* @param {Node|null} root
* @return {number[]}
*/
var postorder = function (root) {
if (!root) return []
const res = [];
function dfs(node) {
  if (!node) return;
  for (let i = 0; i < node.children.length; i++) {
    dfs(node.children[i]);
  }
  res.push(node.val);
}
dfs(root);
return res;
};
```
