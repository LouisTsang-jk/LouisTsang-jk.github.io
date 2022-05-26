# 跨域

由同源策略(same origin policy)限制请求的场景。

## 同源策略

**同源策略**限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

- 协议相同
- 域名相同
- 端口相同

  同源策略限制以下行为：

4. Cookie、LocalStorage 和 IndexDB 无法读取
5. DOM 和 JS 对象无法获得
6. AJAX 请求不能发送

## 解决方案

### jsonp

主要是通过动态创建标签来实现从不同的域名下加载静态资源。

> 只能实现 get 请求

### document.domain

通过 JS 强制设置`document.domain`为基础主域，实现同域。

### postMessage

postMessage(data, origin)

- data：支持任意基本类型和可复制的对象，避免浏览器兼容问题，尽量使用 JSON.stringify()序列化
- origin：协议 + 主机 + 端口号，也可以设置成"\*"，表示可以传递到任意窗口，如果要指定和当前窗口同源则设置"/"

### CORS

设置 CORS
TODO

### nginx 反向代理

### node 中间件

# 参考
[前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)