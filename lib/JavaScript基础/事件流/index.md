# 事件流

## 阶段

- 捕获阶段(`Capture Phase`)
- 目标阶段(`Target Phase`)
- 冒泡阶段(`Bubbling Phase`)
  ![MDN｜事件介绍](./bubbling-capturing.png)

## 类型

### DOM 0 级事件

只有冒泡阶段，一般是以`onType`形式出现(`onClick`、`onMouseOver`等)

> DOM 0 级事件是指事件发生时，事件对象的目标元素就是事件发生的元素，而不是事件目标元素的父元素。

### DOM 2 级事件

通过`addEventListener`方法添加的事件，通过配置`useCapture`参数决定是捕获(`true`)还是冒泡(`false`)

> DOM 2 级事件是指事件发生时，事件对象的目标元素就是事件目标元素的父元素。

### DOM 3 级事件

DOM 2 级事件的补充，有 `focus`、`mousewheel` 等

## 阻止

### stopPropagation

阻止捕获和冒泡阶段中当前事件的进一步传播。但是不能防止任何默认行为的发生。

### stopImmediatePropagation

阻止监听同一事件的其他事件监听器被调用。

### preventDefault

如果当前`event.cancelable`属性为`true`，则取消的当前事件的默认动作，**`但不阻止当前事件的进一步传播`**

#### 示例
[stopPropagation/stopImmediatePropagation示例](./Propagation.html)

## 事件委托(Event Delegation)

因为无论是捕获阶段还是冒泡阶段都是层层递进的，所以可以通过将事件绑定在父元素上，在事件中找出需要触发的子元素，然后执行对应操作。

### 示例

[EventDelegation 示例](./EventDelegation.html)

```
const ul = document.querySelector("ul");
ul.addEventListener(
  "click",
  (event) => {
    alert(event.target.innerHTML);
  },
  false
);
```

> 通过事件委托可以减少绑定的事件数量，从而提高性能
