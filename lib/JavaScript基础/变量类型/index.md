# 变量类型
在JavaScript中，变量可以分为基础类型和引用类型。   
其中基础类型存放在栈中；引用类型的指针存放在栈中，具体数据则在堆中。
## 基础类型
- string
- boolean
- number
- symbol
- null
- undefined
- bigint
## 引用类型
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
  2. typeof new 基础类型的构造函数(any)
      > 除function外，其他构造函数创建的实例都认为是object
- `instanceof`   
  检测构造函数的 prototype 属性是否出现在目标对象的原型链上
- `Object.prototype.toString`