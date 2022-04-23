# React

## 架构

### 调度器(`Scheduler`)

调度任务优先级

### 协调器(`Reconciler`)

找出变化的组件，并给变化的组件打上标记(Placement、Update、PlacementAndUpdate、Deletion)，当所有组件都完成 Reconciler 才会交给 Renderer。

### 渲染器(`Renderer`)

将变化的组件渲染到页面上
