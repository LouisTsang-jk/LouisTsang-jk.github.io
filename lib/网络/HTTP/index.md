# HTTP

## 历史
### HTTP0.9
只有 GET 请求，并且只能传输文本 html 格式，返回的内容是 ASCII 字符串流
### HTTP1.0
- 二进制文件传输(视频音频图片)
- 请求头/响应头信息(原来只需要传输数据)
- 状态码(status code)
- 多字符集支持
- 缓存(cache)
- 新增 POST 和 HEAD 等请求方法
- 非标准的长链接  
  请求头添加`Connection: keep-alive`，默认不开启
- 内容编码(content encoding)
- 多部分发送(multi-part type)
### HTTP1.1
- 管道机制(pipeling)
- 默认开启`keep-alive`
- 头信息`Content-Length`
- 更多的请求方式，如 PUT、PATCH、OPTIONS、DELETE 等
- 头信息 Host
- 支持断点续传
- 24 个错误状态响应码
### HTTP/2
### HTTP/3
## HTTPS
## 状态码
## 简单请求/复杂请求