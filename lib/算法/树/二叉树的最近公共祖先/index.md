# 二叉树的最近公共祖先

## 出处

[leetcode ｜ 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

> 难度: 中等

## 题解/思路

### 递归
1. `p`和`q`分别是当前遍历节点的左右节点，则当前遍历节点是最近公共祖先
2. 当前遍历为空时，返回空
3. 当前遍历为`p`或者`q`时，返回当前遍历节点
4. 递归左右节点

```
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
};
```