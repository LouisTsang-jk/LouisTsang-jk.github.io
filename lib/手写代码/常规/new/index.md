# new

1. 创建空对象
2. 继承构造函数的原型对象
3. 将 this 指向空对象,并将传入构造函数的参数在空对象上下文中执行一遍
4. 如果构造函数返回一个对象/函数，则直接返回这个对象，反之返回新创建的对象

## Code

[new.js](./index.js)

## Test Unit

[new.test.js](./index.test.js)
