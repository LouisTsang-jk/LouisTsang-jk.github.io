# CDN(Content Delivery Network)

内容分发网络，通过现有的 Internet 中增加一层新的 Cache 层，将网站内容发布到多个节点上，使用户就近访问，提高网站的响应速度。同时可以避免网络拥塞、缓解源站压力。

## CNAME 记录(CNAME record)

Canonical Name，可以将一个域名解析到另一个域名。

## 过程

1. 用户在浏览器中输入要访问的域名
2. 浏览器向 DNS 服务器请求对域名进行解析

- 由于 CDN 对域名解析进行调整
- DNS 服务器会将解析权交给 CNAME 指向**CDN 专用 DNS 服务器**

3. CDN 的 DNS 服务器将 CDN 负载均衡设备 IP 地址返回
4. 用户向 CDN 负载均衡设备发起内容 URL 访问请求
5. CDN 负载均衡会为用户选择一台合适的缓存服务器

# 参考

[架构必问：CDN 是什么？为什么快？？](https://segmentfault.com/a/1190000041623180)
