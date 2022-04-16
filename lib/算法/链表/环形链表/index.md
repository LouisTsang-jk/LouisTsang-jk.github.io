# 环形链表

## 出处

[leetcode | 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

## 题解/思路

### 快慢指针

- 空间复杂度 O(1)
- 时间复杂度 O(n)
快指针比慢指针跨度大
1. 快指针遍历结束，说明没有环
2. 快指针和慢指针相等，说明有环
```
/**
* Definition for singly-linked list.
* function ListNode(val) {
*     this.val = val;
*     this.next = null;
* }
*/

/**
* @param {ListNode} head
* @return {boolean}
*/
var hasCycle = function(head) {
  if (!head || !head.next) return false;
  let slow = head;
  let fast = head.next;
  while (fast !== slow) {
    // fast节点遍历结束
    if (!fast || !fast.next) {
      return false
    }
    fast = fast.next.next;
    slow = slow.next;
  }
  return true;
};
```
