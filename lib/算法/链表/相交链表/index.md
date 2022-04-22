# 相交链表

## 出处

[leetcode｜相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

## 题解/思路

### 双指针

> 这题要注意就是，当先遍历完的链表接下来遍历另外一个链表，如果两个链表有相交，则两个指针会重合

- 空间复杂度 O(1)
- 时间复杂度 O(n^2)

  ```
  /**
  * Definition for singly-linked list.
  * function ListNode(val) {
  *     this.val = val;
  *     this.next = null;
  * }
  */

  /**
  * @param {ListNode} headA
  * @param {ListNode} headB
  * @return {ListNode}
  */
  var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;
  let pA = headA;
  let pB = headB;
  while (pA !== pB) {
    pA = pA ? pA.next : headB
    pB = pB ? pB.next : headA
  }
  return pA;
  };
  ```
