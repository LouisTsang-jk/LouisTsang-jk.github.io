# 路径总和

## 出处

[leetcode | 路径总和](https://leetcode-cn.com/problems/path-sum/)

> 难度: 简单

## 题解/思路

### 递归

- 空间复杂度 O(H) 树高度
- 时间复杂度 O(n)
  当遍历当前节点是叶节点时判断是否符合条件

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
* @param {number} targetSum
* @return {boolean}
*/
var hasPathSum = function(root, targetSum) {
if (!root) return false;
if (!root.left && !root.right) {
  return targetSum - root.val === 0;
}
return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right,  targetSum - root.val);
};
```
