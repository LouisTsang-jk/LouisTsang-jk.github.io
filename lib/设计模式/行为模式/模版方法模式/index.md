# 模版方法模式


## 组成
- 抽象父类   
封装了子类的算法框架/公共方法/封装子类中所有方法的执行顺序
- 实现子类    

## 思想
子类通过继承抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

## 示例
经典Demo——Coffee or Tea
```
const Coffee = function () {}
Coffee.prototype.boilWater = function () {
  console.log('把水煮沸')
}
Coffee.prototype.brewCoffeeGrinds = function () {
  console.log('把沸水冲泡咖啡')
}
Coffee.prototype.pourInCpu = function () {
  console.log('把咖啡倒进杯子')
}
Coffee.prototype.addSugarAndMilk = function () {
  console.log('加入糖和牛奶')
}
Coffee.prototype.init = function () {
  this.boilWater()
  this.brewCoffeeGrinds()
  this.pourInCpu()
  this.addSugarAndMilk()
}
```