# 平衡二叉树

## 出处

[平衡二叉树 | leetcode](https://leetcode-cn.com/problems/balanced-binary-tree/)

> 难度: 简单

## 题解/思路

这题有点类似求二叉树深度

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
* @return {boolean}
*/

var isBalanced = function (root) {
if (!root) return true
var getHeight = function (node) {
  if (!node) return 0;
  return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}
if (Math.abs(getHeight(root.left) - getHeight(root.right)) > 1) {
  return false;
}
return isBalanced(root.left) && isBalanced(root.right);
};
```
