# 二叉树的序列化与反序列化

## 出处

[leetcode ｜ 二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)

> 难度: 困难

## 题解/思路

### 递归

- 空间复杂度 O(n)
- 时间复杂度 O(n)
  这里的序列化就是前序遍历

```
/**
* Definition for a binary tree node.
* function TreeNode(val) {
*     this.val = val;
*     this.left = this.right = null;
* }
*/

/**
* Encodes a tree to a single string.
*
* @param {TreeNode} root
* @return {string}
*/
var serialize = function (root) {
const res = [];
function dfs(node) {
  if (!node) {
    res.push(null);
    return
  }
  res.push(node.val);
  dfs(node.left);
  dfs(node.right);
}
dfs(root);
return res;
};

/**
* Decodes your encoded data to tree.
*
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function (data) {
function dfs () {
  if (!data.length) return null;
  const val = data.shift();
  // 这里注意Val可能是0，所以不能用!val判断
  if (val === null) return null;
  const node = new TreeNode(val);
  node.left = dfs();
  node.right = dfs();
  return node;
}
return dfs();
};

/**
* Your functions will be called as such:
* deserialize(serialize(root));
*/
```
