# 返回倒数第 k 个节点

## 出处

[leetcode｜返回倒数第k个节点](https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/)

> 难度: 简单


## 题解/思路

### 快慢指针

- 空间复杂度 O(1)
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
  * @param {number} k
  * @return {number}
  */
  var kthToLast = function (head, k) {
  let fast = head;
  let slow = head;
  let i = 0;
  while (fast && i < k) {
    i++;
    fast = fast.next;
  }
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow.val
  };
  ```
