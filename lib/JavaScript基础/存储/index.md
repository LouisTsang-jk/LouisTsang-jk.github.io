# 存储

## Cookie

是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
主要用于：

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

### API

- document.cookie.setItem()
- document.cookie.getItem()
- document.cookie.removeItem()
- document.cookie.hasItem()
- document.cookie.keys()

---

### Session Cookie(会话型 Cookie)

浏览器关闭之后就会自动删除

### Permanent Cookie(持久型 Cookie)

可以指定指定的过期时间(Expires)或有效期(Max-Age)

## Web Storage

使浏览器能以一种比使用 Cookie 更直观的方式存储键/值对

### sessionStorage

为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。

### localStorage

### API

- `Storage.getItem()`
- `Storage.setItem()`
- `Storage.removeItem()`
- `Storage.clear()`
  同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。

## IndexDB

底层 API，用于客户端存储大量的结构化数据。
