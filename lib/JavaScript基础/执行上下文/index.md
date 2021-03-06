# 执行上下文
执行上下文是一个抽象的环境概念，在这个环境里 JavaScript 代码被解释和执行。每当代码在 JavaScript 中运行，它都是在一个执行上下文中运行。

执行上下文有三个类型：
1. `全局执行上下文`    
一个程序只能有一个全局执行上下文，其中这里还创建一个全局对象，并将This指向这个全局对象
2. `函数执行上下文`    
每当一个函数被调用的时候都会为该函数创建一个新的执行上下文，每个函数都有自己的执行上下文
3. `eval函数执行上下文`    

创建执行上下文的过程分为两步：
1. 创建阶段
    - 创建[词法环境(Lexical Environment)](../词法环境)组件
    - 创建[变量环境(Variable Environment)](../变量环境)组件
> 词法环境里变量的初始值是`uninitialized`；   
> 变量环境里变量的初始值是`undefined`；这就是为什么会有变量提升和暂存死区的原因，而在词法环境的执行阶段下，如果找不到let变量的值会被赋值为`undefined`。
2. 执行阶段
在这个阶段，所有变量的赋值都会完成，代码最终被执行。
