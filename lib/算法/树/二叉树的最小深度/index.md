# 二叉树的最小深度

## 出处

[leetcode ｜ 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

> 难度: 简单

## 题解/思路

### 递归

- 空间复杂度 O(n)
- 时间复杂度 O(logn)

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
* @return {number}
*/
var minDepth = function (root) {
if (!root) return 0;
if (!root.left) {
  return minDepth(root.right) + 1;
}
if (!root.right) {
  return minDepth(root.left) + 1;
}
return Math.min(minDepth(root.left) + 1, minDepth(root.right) + 1);
};
```
