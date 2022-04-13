# 事件循环

JavaScript 是单线程语言，为了实现一些操作，浏览器提供了一些异步、非阻塞的`Web API`(`DOM`、`HTTP`、`setTimeout`)。

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

JavaScript 运行时有一个队列来存放待处理消息的消息队列。

## 流程

当代码执行的时候，碰到 Web API 如 setTimeout，就会将 setTimeout 的回调函数添加到 Web API 中执行，此时并不会添加到调用栈中，而是添加到事件队列里。**`当调用栈为空的时候，就会弹出事件队列中的任务并添加到调用栈中，当调用栈又为空的时候就循环上述操作`**，事件循环就是连接调用栈和事件队列。

## 异步任务

### 宏任务

- <script>
- setTimeout
- setInterval
- setImmediate
- I/O
- UI Event
- requestAnimationFrame

### 微任务

- Promise.then()/resolve()
- process.nextTick
- MutaionObserver

### 机制
**当执行栈为空的时候，主线程会查看宏任务队列是否有事件存在，如果存在则将最老的宏任务添加到执行栈，在这个宏任务的执行过程中如果遇到微任务，就会将其添加到微任务队列中，当这个宏任务执行完之后会依次执行微任务队列。并且在宏任务执行完毕之后会检查渲染，然后GUI线程接管渲染来实现重绘和回流。当渲染完毕之后JS线程继续接管，开始继续从事件队列取最老的宏任务执行。**

### 训练
1.
```
setTimeout(function(){
  console.log('a');
});
new Promise(function(resolve){
  console.log('b');
  for(var i = 0;i < 10000;i++){
    i == 99 && resolve();
  }
}).then(function(){
  console.log('c');
})
console.log('d');
```
> 1. 执行script下的*宏任务*，遇到setTimeout，将其放入*宏任务队列*         
> 2. 遇到Promise,new Promise直接执行，打印b         
> 3. 遇到then方法，是*微任务*，放入*微任务队列*         
> 4. 遇到console.log('d')，直接打印         
> 5. 本轮*宏任务*执行完毕，查看*微任务*，发现then方法里面的函数，打印c         
> 6. 本轮event loop全部完成         
> 7. 下一轮循环，先执行*宏任务*，发现*宏任务队列*中还有一个setTimeout，打印a           
> // -> b,d,c,a
---
2.
```
console.log('a');

setTimeout(function() {
    console.log('b');
    process.nextTick(function() {
        console.log('c');
    })
    new Promise(function(resolve) {
        console.log('d');
        resolve();
    }).then(function() {
        console.log('e')
    })
})
process.nextTick(function() {
    console.log('f');
})
new Promise(function(resolve) {
    console.log('g');
    resolve();
}).then(function() {
    console.log('h')
})

setTimeout(function() {
    console.log('i');
    process.nextTick(function() {
        console.log('j');
    })
    new Promise(function(resolve) {
        console.log('k');
        resolve();
    }).then(function() {
        console.log('l')
    })
})
```
> a、g、f、h、b、d、c、e、i、k、j、l
---
3.
```
Promise.resolve().then(() => {
  console.log('1')
  setTimeout(() => {
    console.log('2')
  },0)
})

setTimeout(() => {
  console.log('3')
  Promise.resolve().then(() => {
    console.log('4')
  })
},0)
```
> 1、3、4、2

# 参考

[MDN|EventLoop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
