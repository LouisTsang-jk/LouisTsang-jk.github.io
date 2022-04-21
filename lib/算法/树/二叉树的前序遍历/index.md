# 二叉树的前序遍历

## 出处

[leetcode | 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

> 难度: 简单

## 题解/思路

### 递归

- 空间复杂度 O(1)
- 时间复杂度 O(n)

```
/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @return {number[]}
*/
var preorderTraversal = function(root) {
const result = [];
function dfs (node) {
  if (!node) return;
  const left = node.left;
  const right = node.right;
  result.push(node.val);
  left && dfs(left);
  right && dfs(right);
}
dfs(root);
return result;
};
```
