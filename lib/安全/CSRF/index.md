# CSRF
CSRF(Cross site request forgery)跨站请求伪造，通过挟持用户当前登录的Web应用。
> 无法窃取cookie，只是盗用用户信息去进行请求。    

> 本质：**未知网页A -> 不知情跳转 -> 信任网站B -> 恶意操作(以用户网站B的身份)**
## 示例
1. 现在存在交易平台A，现在已经登录过。   
A站存在接口如下：
```
GET http://netbank.com/transfer.do?acct=用户&amount=$100 HTTP/1.1
```
2. 不法分子通过群发恶意邮件
3. 用户点击恶意邮件中的链接
4. 网页B中存在以下a标签以达到攻击效果
```
<a href="GET http://netbank.com/transfer.do?acct=不法分子&amount=$100 HTTP/1.1"></a>
```
> 不一定以a标签，可以使用form标签并自动执行嵌入的script标签(即表明CSRF攻击不局限于GET请求)


## 措施
1. 检测http referer是否是同域名
2. 避免登录的session长时间保存
3. **添加token机制**(最常用)

# 参考
[CSRF](https://www.imperva.com/learn/application-security/csrf-cross-site-request-forgery)