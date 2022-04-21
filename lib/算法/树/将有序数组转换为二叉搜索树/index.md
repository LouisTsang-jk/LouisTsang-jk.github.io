# 将有序数组转换为二叉搜索树

## 出处

[leetcode | 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

> 难度: 简单

## 题解/思路

### 递归

因为是单调递增，所以用中序遍历，然后是平衡二叉树，所以取中心点作为索引

> 这里注意 mid 取值

- 空间复杂度 O(1)
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
* @param {number[]} nums
* @return {TreeNode}
*/
var sortedArrayToBST = function(nums) {
const buildTree = (arr, left, right) => {
  if (left > right) return null;
  const mid = Math.floor(left + (right - left) / 2)
  // const mid = right >> 1;
  const root = new TreeNode(arr[mid]);
  root.left = buildTree(arr, left, mid - 1);
  root.right = buildTree(arr, mid + 1, right);
  return root;
}
return buildTree(nums, 0, nums.length - 1);
};
```
