# 删除链表的倒数第 N 个结点

## 题目

[删除链表的倒数第 N 个结点｜leetcode](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

## 题解/思路

### 快慢指针

- 空间复杂度 O(1)
- 时间复杂度 O(n)

```
/**
* Definition for singly-linked list.
* function ListNode(val, next) {
*     this.val = (val===undefined ? 0 : val)
*     this.next = (next===undefined ? null : next)
* }
*/
/**
* @param {ListNode} head
* @param {number} n
* @return {ListNode}
*/
var removeNthFromEnd = function(head, n) {
const dummy = new ListNode(0);
dummy.next = head;
let slow = dummy;
let fast = dummy;
while (n--) {
  fast = fast.next;
}
while (fast && fast.next) {
  fast = fast.next;
  slow = slow.next;
}
slow.next = slow.next.next;
return dummy.next;
};
```
