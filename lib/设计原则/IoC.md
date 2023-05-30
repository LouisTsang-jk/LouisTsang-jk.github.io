# 控制反转 IoC (Inversion of Control)
用于降低代码之间的耦合度。在传统的编程模式中，组件或服务通常主动去寻找它所依赖的其他组件或服务。然而，控制反转改变了这个模式，使得依赖的组件或服务被动地被注入到需要它们的地方。


## 示例
- IoC Version
```
class Engine {
  constructor(public type: string) { }
}

class Car {
  // Engine is injected through the constructor
  constructor(public engine: Engine) { }
}

// IoC container creates the instances and injects dependencies
let engine = new Engine('V8');
let car = new Car(engine);
```

- Legacy
```
class Engine {
  constructor(public type: string) { }
}

class Car {
  public engine: Engine;

  constructor() {
    // Car creates the instance of Engine
    this.engine = new Engine('V8');
  }
}

// No IoC container, dependencies are created manually
let car = new Car();
```
可以看到，没有使用IoC时，Car组件需要主动创建它所依赖的Engine实例。这使得Car与Engine之间的耦合度较高。

## 优点
- 解耦：控制反转将组件或服务的创建和维护交给了IoC容器，使得各个组件可以独立地进行开发和测试。
- 代码复用：由于各个组件之间的耦合度降低，组件可以更容易地在不同的场景下进行复用。
- 可维护性：改变一个组件的实现不会影响到其他的组件。