# 验证二叉搜索树

## 出处

[leetcode｜验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

> 难度: 中等

## 题解/思路

> 二叉搜索树在中序遍历(顺序遍历)的情况下是单调递增的。
> 这里只需要中序遍历，然后对面父节点和当前节点，父节点大于等于子节点

### 递归

- 空间复杂度 O(1)
- 时间复杂度 O(n^2)

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
var isValidBST = function(root) {
  let prev = -Infinity;
  let result = true;
  loop(root);
  function loop (node) {
    if (!node) return;
    loop(node.left);
    if (node.val <= prev) {
      result = false;
      return ;
    }
    prev = node.val;
    loop(node.right);
  }
  return result;
};
```
