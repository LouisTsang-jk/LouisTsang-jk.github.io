# 状态模式

允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。

## 示例

### 开关

当前有一盏电灯 💡，一共三个档位：`强(Strong)`、`弱(Weak)`、`关(Off)`

#### jssm

```
const LightState = sm`Strong -> Weak -> Off -> Strong;`;
```

#### js

```
const OffLightState = function (light) {
  this.light = light;
}
OffLightState.prototype.buttonWasPressed = function () {
  console.log('弱光');
  this.light.setState(this.light.weakLightState);
}
const WeakLightState = function (light) {
  this.light = light;
}
WeakLightState.prototype.buttonWasPressed = function () {
  console.log('强光');
  this.light.setState(this.light.strongLightState);
}
const StrongLightState = function (light) {
  this.light = light;
}
StrongLightState.prototype.buttonWasPressed = function () {
  console.log('关灯');
  this.light.setState(this.light.offLightState);
}
// Light 类
const Light = function () {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
}
Light.prototype.init = function () {
  const button = document.createElement('button');
  const self = this;
  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';
  this.currentState = this.offLightState; // Default state
  this.button.onclick = function () {
    self.currentState.buttonWasPressed();
  }
}
Light.prototype.setState = function (newState) {
  this.currentState = newState;
}
```

# 参考

- 《JavaScript 设计模式与开发实践》
