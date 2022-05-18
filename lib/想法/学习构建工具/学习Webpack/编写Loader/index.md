# Loader
## 编写Loader
> 因为Loader内可以通过this访问上下文，所以Loader不能是箭头函数，异步操作通过callback
### 示例
- sync
```
function (content, map, meta) {
  return sync(content);
}
```
- async
```
function (content, map, meta) {
  this.callback(null, sync(content), map, meta);
  return;
}
```

### 实现
写一个`loader`，自动将`// log: (输出)`的内容转成`console.log(输出)`
[Demo](./demo.png)