# N叉树的前序遍历

## 出处

[leetcode ｜ N叉树的前序遍历](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)

> 难度: 简单

## 题解/思路

### 递归

- 空间复杂度 O(1)
- 时间复杂度 O(n)

```
/**
* // Definition for a Node.
* function Node(val, children) {
*    this.val = val;
*    this.children = children;
* };
*/

/**
* @param {Node|null} root
* @return {number[]}
*/
var preorder = function (root) {
if (!root) return [];
const res = [];
function dfs(node) {
  if (!node) return;
  res.push(node.val);
  for (let i = 0; i < node.children.length; i++) {
    dfs(node.children[i]);
  }
}
dfs(root);
return res;
};
```
