# 编写Loader
> 因为Loader内可以通过this访问上下文，所以Loader不能是箭头函数，异步操作通过callback
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