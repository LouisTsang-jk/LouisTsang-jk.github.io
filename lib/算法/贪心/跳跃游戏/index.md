# 跳跃游戏

## 出处

[leetcode ｜ 跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

> 难度: 中等

## 题解/思路

### 贪心算法

- 空间复杂度 O(1)
- 时间复杂度 O(n)

记录最大可跳跃距离，这个距离等于 i + nums[i]
当 i 大于可跳跃的最大距离，则表明无法到达

```
/**
* @param {number[]} nums
* @return {boolean}
*/
var canJump = function (nums) {
let canJumpMax = 0;
for (let i = 0; i < nums.length; i++) {
  if (i > canJumpMax) return false;
  canJumpMax = Math.max(canJumpMax, i + nums[i]);
}
return true;
};
```
