# 对称二叉树

## 出处

[leetcode｜对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

> 难度: 简单

## 题解/思路

### 递归

- 空间复杂度 O(n)
- 时间复杂度 O(n)
  这里需要注意递归的时候传入的是`left.left`，`right,right`和`left.right`，`right.left`，这里是对称的

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
var isEqual = function (left, right) {
if (!left && !right) return true
if (!left || !right) return false
return left.val === right.val && isEqual(left.left, right.right) && isEqual(left.right, right.left);
}

var isSymmetric = function (root) {
if (!root) return true;
return isEqual(root.left, root.right);
};


```
