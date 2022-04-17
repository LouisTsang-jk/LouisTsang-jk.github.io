# 两数相加

## 出处

[环形链表 | leetcode](https://leetcode-cn.com/problems/add-two-numbers/)

## 题解/思路

### 遍历
这题本来就是逆序的，所以比较好处理，只要记录进位即可。

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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const dummy = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p = dummy;
  let carry = 0;
  while (p1 || p2 || carry > 0) {
    let val = carry;
    if (p1) {
      val += p1.val;
      p1 = p1.next;
    }
    if (p2) {
      val += p2.val;
      p2 = p2.next;
    }
    carry = Math.floor(val / 10);
    val = val % 10;
    p.next = new ListNode(val);
    p = p.next;
  }
  return dummy.next;
};
```
