# 变量类型
在JavaScript中，变量可以分为基本类型和引用类型。   
其中基本类型存放在栈中；引用类型的指针存放在栈中，具体数据则在堆中。
## 基本类型
- string
- boolean
- number
- symbol
- null
- undefined
- bigint
## 引用类型
除了基本类型就是引用类型
- Map
- WeakMap
- Set
- WeakSet   
...
## 装箱
> 将基本数据类型转换为对应的引用类型的操作   
[ECMA|Semantics-Evaluation](https://tc39.es/ecma262/#sec-property-accessors-runtime-semantics-evaluation)
## 拆箱
引用类型转换成基本的数据类型，一般使用引用类型的valueOf()和toString()方法实现。

## 类型检测
- `typeof`   
    返回对应类型
    ```
    typeof null // object
    typeof 'str' // string
    typeof new String(''); // object
    typeof new Function(); // function
    ```
  1. typeof null
      > 是因为JavaScript最初实现时，值是由一个标签和实际数值表示；对象的标签是0，而null表示空指针(0x00)，因此typeof也会认为null是object，这是一个历史缺陷。
  2. typeof new 基本类型的构造函数(any)
      > 除function外，其他构造函数创建的实例都认为是object
- `instanceof`   
    > [手写instanceof](/lib/手写代码/常规/insatanceof/index.js)    
    > [ECMA|instanceof](https://tc39.es/ecma262/#sec-instanceofoperator)

  检测构造函数的 prototype 属性是否出现在目标对象的原型链上
- `Object.prototype.toString`
  一般需要配合call、apply使用，因为一般对象的toString方法都被重写过
  ```
  ({}).toString() // '[object Object]'
  ([1, 2]).toString() // '1, 2'
  Object.prototype.toString.call([1, 2]) // '[object Array]'
  ```
  > 如果传入是null,undefined则直接返回对应tag； // [object Null] and [object Undefined]   
  > 如果传入原始类型，则进入装箱转为对象
  > 如果传入对象，就会获取该对象的`[Symbol.toStringTag]`作为tag，最终返回`[object ${tag}]`
  ```
  const a = {
    [Symbol.toStringTag]: 'Any'
  }
  Object.prototype.toString.call(a); // [Object Any]
  ```




# 参考
[从深入到通俗：Object.prototype.toString.call()](https://zhuanlan.zhihu.com/p/118793721)
[MDN|使用 toString() 检测对象类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#%E8%A7%84%E8%8C%83)
[MDN|Symbol.toStringTag](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)