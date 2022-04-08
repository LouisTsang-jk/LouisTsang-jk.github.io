# 调用栈
当JavaScript解释器在执行逐行解析代码的时候，会创建调用栈(call stack)。因为JavaScript是单线程语言，在浏览器中一次只发生一件事情，其余的事情都在这个调用栈中等待运行，当函数有返回则会出栈。

## 调试
Chrome的调试可以通过逐行执行程序查看调用栈情况。
![call_stack](./call_stack.jpeg)