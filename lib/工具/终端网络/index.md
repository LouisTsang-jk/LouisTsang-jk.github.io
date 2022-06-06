# 终端网络
## 检测梯子是否正常
```
curl cip.cc
```

## 终端sock5代理
```
export http_proxy=socks5://127.0.0.1:1100;export https_proxy=socks5://127.0.0.1:1100;
```

## 查看代理
```
npm config list
yarn config list
```

## 设置npm代理
```
npm config set proxy=<proxy-url>
```

## 设置yarn代理
```
yarn config set proxy socks5://127.0.0.1:1100;
yarn config set https-proxy socks5://127.0.0.1:1100;
```

## 删除代理
```
yarn config delete proxy;
yarn config delete https-proxy;
```
