# 删除排序链表中的重复元素

## 出处

[leetcode | 删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

> 难度: 简单

## 题解/思路

### 暴力解法

- 空间复杂度 O(1)
- 时间复杂度 O(n)
  > 这里需要注意消除重复项之后指针不应该推动

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
var deleteDuplicates = function(head) {
let cur = head;
while (cur && cur.next) {
  const next = cur.next;
  if (cur.val === next.val) {
    cur.next = next.next
  } else {
    cur = cur.next;
  }
}
return head;
};
```
