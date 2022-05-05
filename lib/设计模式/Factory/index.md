# 工厂模式
父类提供创建对象的方法；子类决定实例化对象的类型。工厂模式又分为下面三种：
- 简单工厂
- 工厂方法
- 抽象工厂
> 三者区别是抽象程度不一样
## 定义
一个类只有一个实例。
## 场景
- React.createElement
## 特点
- 该类只能有一个实例
- 自行创建这个实例
- 自行向整个系统提供这个实例
### 优点
- 保证内存里只有一个实例，减少内存开销
- 避免资源的多重占用
- 设置全局访问点，可以优化和共享资源访问
### 缺点
- 没有抽象层，扩展比较困难
- 职责过重，违背单一职责原则
## JavaScript实现
[Singleton.js](../../手写代码/创建模式/单例模式)

# 参考
[单例模式（单例设计模式）详解](http://c.biancheng.net/view/1338.html)
[单例模式](https://design-patterns.readthedocs.io/zh_CN/latest/creational_patterns/singleton.html)