# 翻转二叉树

## 出处

[leetcode | 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

> 难度: 简单

## 题解/思路

### 递归

- 空间复杂度 O(n)
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
* @return {TreeNode}
*/
var invertTree = function (root) {
if (!root) { return null }
return {
  val: root.val,
  left: invertTree(root.right),
  right: invertTree(root.left)
}
}
```
