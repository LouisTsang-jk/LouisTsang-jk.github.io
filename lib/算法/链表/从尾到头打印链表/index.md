# 从尾到头打印链表

## 出处

[leetcode | 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

> 难度:简单

# 题解/思路

### 栈

- 空间复杂度 O(n)
- 时间复杂度 O(n)

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
  * @return {number[]}
  */
  var reversePrint = function(head) {
  const result = [];
  while (head) {
    result.unshift(head.val);
    head = head.next;
  }
  return result;
  };
  ```
