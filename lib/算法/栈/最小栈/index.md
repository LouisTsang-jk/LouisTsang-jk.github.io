# 最小栈

## 出处

[leetcode ｜ 最小栈](https://leetcode-cn.com/problems/min-stack/)

> 难度: 简单

## 题解/思路

### 辅助栈

- 空间复杂度 O(1)
- 时间复杂度 O(n)

```
var MinStack = function () {
this.stack = [];
this.assist = [Infinity];
};

/**
* @param {number} val
* @return {void}
*/
MinStack.prototype.push = function (val) {
this.stack.push(val);
this.assist.push(Math.min(val, this.assist[this.assist.length - 1]));
};

/**
* @return {void}
*/
MinStack.prototype.pop = function () {
this.assist.pop();
return this.stack.pop();
};

/**
* @return {number}
*/
MinStack.prototype.top = function () {
return this.stack[this.stack.length - 1];
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function () {
return this.assist[this.assist.length - 1];
};

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/
```
