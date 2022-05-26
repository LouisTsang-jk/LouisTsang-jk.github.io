# 错误监控
要做错误监控先罗列一下常见的错误，再对症下药才行。
## 错误
- JS错误
- 资源异常
- 请求

## 方式
- 第三方    
Sentry
- Try/Catch    
处理一些常规容易出现错误的地方
- window.onerror    
类似一种全局的兜底处理
- addEventListener('error', function () {}, true)    
可以监听静态资源的错误
> 错误没有冒泡
- 框架/库检测
1. React    
[React ｜ ErrorBoundary](https://reactjs.org/docs/error-boundaries.html)
2. Vue    
[Vue ｜ errorHandler](https://v3.cn.vuejs.org/api/application-config.html#errorhandler)
3. Angular    
[Angular ｜ ErrorHandler](https://angular.io/api/core/ErrorHandler)