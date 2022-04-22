# 二叉树的层序遍历

## 出处

[二叉树的层序遍历｜leetcode](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

> 难度: 中等

# 题解/思路

### DFS

这里有时候会漏了新建数组的时候默认里面应该也有值

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
* @return {number[][]}
*/



var levelOrder = function (root) {
if (!root) return [];
const result = [];
var dfs = function (node, level) {
  const left = node.left;
  const right = node.right;
  left && dfs(left, level + 1);
  if (result[level]) {
    result[level].push(node.val);
  } else {
    result[level] = [node.val];
  }
  right && dfs(right, level + 1);
}
let depth = 0;
dfs(root, depth);
return result;
};
```
