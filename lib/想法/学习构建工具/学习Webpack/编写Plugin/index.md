# Plugin

## 编写Plugin
### 构成
- 一个JavaScript命名函数
- 插件函数的`prototype`上定义一个`apply`方法
- 指定一个绑定到`webpack`自身的事件钩子
- 处理webpack内部实例的特定数据
- 功能完成后调用webpack提供的回调

### 示例
```
function Plugin1 () {}
Plugin1.prototype.apply = function (complier) {
  complier.plugin(<event hook>, function (compilation, callback) {
    console.log('emit')
    callback()
  })
}
```

### 实现
```

```