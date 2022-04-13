# 事件循环
JavaScript是单线程语言，为了实现一些操作，浏览器提供了一些异步、非阻塞的`Web API`(`DOM`、`HTTP`、`setTimeout`)。

## [调用栈](../调用栈)
函数调用时会推入调用栈，当函数返回的时候弹出。
![call_stack](./call_stack.svg)
```
function foo(b) {
  let a = 10;
  return a + b + 11;
}

function bar(x) {
  let y = 3;
  return foo(x * y);
}
console.log(bar(7)); // 返回 42
```
- step1
![debugger_call_stack_step1](./debugger_call_stack_step1.jpeg)
- step2
![debugger_call_stack_step2](./debugger_call_stack_step2.jpeg)

## 事件队列
JavaScript运行时有一个队列来存放待处理消息的消息队列。

## 流程

# 参考
[MDN|EventLoop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)