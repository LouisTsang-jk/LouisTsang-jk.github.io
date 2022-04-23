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
##### beginWork
从`rootFiber`开始深度优先遍历，创建传入的`FiberNode`的子节点，当遍历到叶节点。
- mount    
组件首次渲染，根据`fiber.tag`渲染对应`FiberNode`(FunctionComponent、ClassComponent、HostComponent)。
- update    
如果存在current，并满足**一定条件**的时候可以复用。
  1. `props`和`fiber.type`不变
  2. Fiber节点优先度不够
> 可以理解为递归的"递"阶段
##### completeWork

#### commit

# 参考

[iamkasong ｜ Fiber 的起源](https://react.iamkasong.com/process/fiber.html#fiber%E7%9A%84%E8%B5%B7%E6%BA%90)
