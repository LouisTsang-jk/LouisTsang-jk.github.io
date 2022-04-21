# 相同的树

## 出处

[相同的树 | leetcode](https://leetcode-cn.com/problems/same-tree/)

> 难度:简单

## 题解/思路

### 递归

- 空间复杂度 O(1)
- 时间复杂度 O(n)
  有几种情况： 
  1. 两个都为空，返回true
  2. 
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
  * @param {TreeNode} p
  * @param {TreeNode} q
  * @return {boolean}
  */
  var isSameTree = function(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return (p.val === q.val) && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  };
  ```
