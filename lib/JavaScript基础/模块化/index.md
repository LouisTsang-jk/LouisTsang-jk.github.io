# Module
模块化就是将一个复杂的程序依据一定的规则封装成几个块(文件)，并将其组合在一起。  
块内部数据和实现是私有的，是指向外暴露一些接口(方法)以此来与其他模块通信。
## CommonJS
使用同步的方式加载模块。使用全局性方法`require()`来加载模块。
```
// main.js
const circle = require('./circle.js');
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
// circle.js
const { PI } = Math;
exports.area = (r) => PI * r ** 2;
exports.circumference = (r) => 2 * PI * r;
```
## AMD(Asynchronous Module Definition)
异步加载模块，允许指定回调函数。也采取`require()`语句。
`不能按需加载`
> `require([module], callback)`
> `define(id, [depends], callback)`
```
// main.js
require(['math'], function (math) {
  math.add(2, 3);
})
// math.js
define(function () {
  const add = function (a, b) {
    return a + b;
  }
  return {
    add
  }
})
```
## CMD
按需加载。
```
define(function (rerquire, exports) {
  a = require('./');
  a.doSomething();
})
```
## UMD(Universal Module Definition)
通用模块，兼容AMD和commonJS规范。AMD异步加载，commonJS同步加载。
## ES6
可以将文件后缀改为`.mjs`，或者修改`package.json``{ type: "module" }`。
使用`import`命令加载CommonJS模块。依赖分析在哪个阶段完成，最底层的模块第一个执行。
- ES6模块加载CommonJS模块
只能整体加载，不能只加载某项。因为需要静态代码分析，CommonJS模块输出接口是`module.exports`，只能整体加载。
# 区别
1. CommonJS模块输出的是值的拷贝。
2. JS引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。当脚本真正执行时，再根据这个只读引用，到被加载的那个模块去取值。
3. CommonJS模块是运行时加载、ES6模块是编译时输出接口
  - CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
  - ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。