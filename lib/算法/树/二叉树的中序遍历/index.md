# 二叉树的中序遍历

## 出处

[leetcode ｜ 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

> 难度: 简单

# 题解/思路

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
  * @return {number[]}
  */
  var inorderTraversal = function(root) {
  const result = [];
  function loop (node) {
    if (!node) return
    const left = node.left;
    const right = node.right;
    left && loop(left);
    result.push(node.val);
    right && loop(right);
  }
  loop(root);
  return result;
  };
  ```

2. 迭代

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
var inorderTraversal = function (root) {
  const result = [];
  const stack = [];
  while (root) {
    stack.push(root);
    root = root.left;
  }
  while (stack.length) {
    let target = stack.pop();
    result.push(target.val);
    target = target.right;
    while (target) {
      stack.push(target);
      target = target.left;
    }
  }
  return result;
};
```
