# 反转链表

## 出处

[leetcode｜反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

## 题解/思路

### 遍历

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
* @return {ListNode}
*/
var reverseList = function(head) {
let prev = null;
let cur = head;
while (cur !== null) {
  const next = cur.next;
  // 修改指针
  cur.next = prev;
  // 推进指针
  prev = cur;
  cur = next;
}
return prev;
};
```
