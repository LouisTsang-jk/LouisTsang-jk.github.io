# 继承

## 常见继承方式
### 原型式继承
```
var person = {
    name: 'Nicholas',
    friends: ["Shelby", "Court", "Van"]
}
var anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push("Rob");
```
> 缺点：
> 1. 引用类型(共享数据)
> 2. 无法给超类型的构造函数传递参数

### 借用构造函数
```
function SuperType (name) {
    this.name = name;
}
function SubType () {
    // 继承SuperType同时传递了参数
    SuperType.call(this, "Nicholas");
    this.age = 29;
}
const instance = new SubType();
alert(instance.name); // "Nicholas"
alert(instance.age); // 29
```

### 组合继承(combination inheritance)    
> 组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为 JavaScript 中最常用的继承模式。而且，instanceof 和 isPrototypeOf()也能够用于识别基于组合继承创建的对象。

> 组合继承的最大缺陷是：无论什么情况下，都会调用两次超类型构造函数
```
function SuperType (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    alert(this.name);
}
function SubType (name, age) {
    // 继承属性
    SuperType.call(this, name); // 第二次调用 SuperType()
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType(); // 第一次调用 SuperType()
SubType.prototype.constructor = SubType;
const instance1 = new SubType("Nicholas", 29);

```
### 寄生式继承(parasitic inheritance)    
> 寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该 函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。以下代码示范了寄 生式继承模式。
```
function createAnother(original) {
    var clone = Object.create(original);
    clone.sayHi = function () {
        alert('hi')
    }
    return clone;
}
const person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
}
const anotherPerson = createAnother(person);
anotherPerson.sayHi(); // hi
```
### 寄生组合式继承    
> 所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
```
function inheritPrototype(subType, superType) {
    var prototype = Object.create(supertType.prototype);    // 创建对象
    prototype.constructor = subType;                        // 增强对象
    subType.prototype = prototype;                          // 指定对象
}
```

### ES6 Class继承    
> Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
```
class Point {
}

class ColorPoint extends Point {
}
```