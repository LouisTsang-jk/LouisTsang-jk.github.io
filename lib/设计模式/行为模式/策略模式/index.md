# 策略模式

定义一系列的算法，将其封装起来并可以互相替换。并且通过策略模式可以实现分离算法的使用和算法的实现。

## 概念

### 环境类(Context)

维护指向具体策略的引用， 且仅通过策略接口与该对象进行交流。

### 抽象策略类(Strategy)

是所有具体策略的通用接口， 它声明了一个上下文用于执行策略的方法。

### 具体策略类(ConcreteStrategy)

实现了上下文所用算法的各种不同变体。

## 应用场景
- 动画
- 校验
- 常规业务封装
...

## Demo
> 出自《JavaScript 设计模式与开发实践》
```
// 策略
const strategies = {
  "S": function (salary) {
    return salary * 4;
  },
  "A": function (salary) {
    return salary * 3;
  },
  "B": function (salary) {
    return salary * 2;
  }
}
// 这里calculateBonus函数充当了(环境类)上下文类的角色
const calculateBonus = function (level, salary) {
  return strategies[level](salary);
}
console.log(calculateBonus("S", 20000)); // 80000
console.log(calculateBonus("A", 10000)); // 30000
```

## 和命令模式区别

- 命令模式：可以使用命令来将任务操作转换为对象。
- 策略模式：描述完成某件事的不同方式，能够在同一个上下文类中切换算法。

# 参考

- JavaScript 设计模式与开发实践
