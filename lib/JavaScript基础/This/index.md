# This

当前执行上下文的一个属性。
绑定 This 又分为显式绑定和隐式绑定
具体 This 指向可以参考[词法环境](../词法环境)

- 显式绑定：

  1. call

  2. apply

  3. bind

  ***

- 隐式绑定：

  1. 全局上下文
     默认指向 window

  2. 直接调用函数
     这种情况是直接调用。this 相当于全局上下文的情况

  3. 对象.方法的形式调用
     指向这个对象

  4. DOM 事件绑定
     默认指向绑定事件的元素

  5. new 构造函数绑定
     构造函数中的 this 指向实例对象

  6. 箭头函数
     箭头函数没有 this，所以不能绑定。this 会指向最近的非箭头函数的 this，找不则 window

## 优先级

new > call/apply/bind > 对象.方法 > 直接调用
