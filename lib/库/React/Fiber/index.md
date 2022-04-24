# Fiber

> 看卡颂文章的学习笔记，此处[链接｜ iamkasong](https://react.iamkasong.com/)

## 含义

- Fiber Reconciler
- Fiber Node(静态)
- Fiber Node(动态)

### Fiber Node

> 每个 Fiber Node 对应 React Element

- 存储组件类型(函数组件/类组件/原生组件...)、对应 DOM 节点
- 存储本次更新中组件改变的状态、要执行的工作(需要被删除/被插入页面中/被更新...)

#### 基本结构

主要分三类

- 静态结构数据
- 动态结构数据
- 优先级相关

```
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

### Fiber Reconciler

#### 更新机制(双缓存)

在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，避免白屏闪烁的情况出现

> React 使用“双缓存”来完成 Fiber 树的**构建**与**替换**(对应着 DOM 树的创建与更新)。

##### 双缓存树

- workInProgress Fiber Tree
  内存中正在构建的 Fiber 树
- current Fiber Tree
  当前屏幕显示内容对应的 Fiber 树
  > 同时两棵树的 Fiber 节点会通过`alternate`属性连接起来。

#### render

> 该阶段异步

##### beginWork

从`rootFiber`开始深度优先遍历，创建传入的`FiberNode`的子节点，当遍历到叶节点。

- mount  
  组件首次渲染，根据`fiber.tag`渲染对应`FiberNode`(FunctionComponent、ClassComponent、HostComponent)。
- update  
  如果存在 current，并满足**一定条件**的时候可以复用。
  1. `props`和`fiber.type`不变
  2. Fiber 节点优先度不够
     > 可以理解为递归的"递"阶段

> effectTag: render 阶段后通知`Renderer`需要执行的 DOM 操作(PlacementAndUpdate、Deletion)

##### completeWork

- mount
  1. 生成对应 DOM 节点
  2. 插入子孙 DOM 节点
  3. `处理props`
- update  
  当前阶段下已存在 DOM 节点，主要是`处理props`    

  处理`HostComponent`的时候，处理好的`props`会赋值到`workInProgress.updateQueue`并在`commit`阶段进行渲染
  > effectList: 为了提高性能，会在此阶段生成 effectList(单向链表)作为 DOM 操作的依据

#### commit

> 该阶段同步

里面又分三个阶段：
> **这里每个阶段本质都是遍历`effectList`**
- `before mutation阶段`  
  执行 DOM 操作前，遍历 effectList 并调用`commitBeforeMutationEffects`函数。
  - commitBeforeMutationEffects
    1. 处理 DOM 渲染/删除后的`autoFocus`、`blur`逻辑
    2. 调用`getSnapshotBeforeUpdate`生命周期函数  
       **(commit 阶段同步执行，不会重复执行)**
    3. 调度`useEffect`
      // TODO 这里需要补充如何调度
       > 有`useEffect`和`useLayoutEffect`的 Fiber 节点也会被赋值 `effectTag`
- `mutation阶段`  
  执行 DOM 操作，遍历 effectList 并调用`commitMutationEffects`函数。
  - commitMutationEffects
    1. 重置文本节点(节点的文字内容设置为空字符串)
    2. 更新ref
    3. 根据effectTag执行对应的DOM操作
      - Placement 
        1. 获取父级DOM节点
        2. 获取Fiber节点的DOM兄弟节点
        3. 根据步骤二结果调用`parent.insertBefore`或`parent.appendChild`
      - Update
        - FunctionComponent mutation   
          **遍历effectList，执行所有`useLayoutEffect`的销毁函数**
        - HostComponent mutation
      - Deletion
        - commitDeletion
          1. 递归Fiber节点及其子孙Fiber节点中的`fiber.tag`为`ClassComponent`的`componentWillUnmount`的生命周期函数，从页面中移除对应DOM节点
          2. 解绑`ref`
          3. 调度`useEffect`的销毁函数
- `layout阶段`  
  - commitLayoutEffects
    - commitLayoutEffectOnFiber
      - ClassComponent   
        根据`mount`或`update`阶段的`effectTag`执行对应的生命周期函数(`componentDidMount`或`componentDidUpdate`)
      - FunctionComponent    
        1. 调用`useLayoutEffect`的回调函数
        2. 调度`useEffect`
          TODO 这里不确定
    - commitAttachRef
  执行 DOM 操作后，

# 参考

[iamkasong ｜ Fiber 的起源](https://react.iamkasong.com/process/fiber.html#fiber%E7%9A%84%E8%B5%B7%E6%BA%90)
