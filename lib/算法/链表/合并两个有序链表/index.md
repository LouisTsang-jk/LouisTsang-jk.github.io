# 合并两个有序链表

## 出处

[leetcode | 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

## 题解/思路

### 双指针

- 空间复杂度 O(1)
- 时间复杂度 O(n^2)

  双指针，不过注意当其中一个链表遍历完之后，另外一个链表可能还有剩余的节点，这时候需要接上去。
  ```
  /**
  * Definition for singly-linked list.
  * function ListNode(val, next) {
  *     this.val = (val===undefined ? 0 : val)
  *     this.next = (next===undefined ? null : next)
  * }
  */
  /**
  * @param {ListNode} list1
  * @param {ListNode} list2
  * @return {ListNode}
  */
  var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(0);
  let cur = dummy;
  let c1 = list1;
  let c2 = list2;
  while (c1 && c2) {
    if (c1.val > c2.val) {
      cur.next = c2;
      c2 = c2.next;
    } else {
      cur.next = c1;
      c1 = c1.next;
    }
    cur = cur.next;
  }
  cur.next = c1 || c2;
  return dummy.next;
  };
  ```
