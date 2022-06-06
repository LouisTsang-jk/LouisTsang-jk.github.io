# 终端网络
## 检测梯子是否正常
```
curl cip.cc
```

## sock5代理
```
export http_proxy=socks5://127.0.0.1:1100;export https_proxy=socks5://127.0.0.1:1100;
```

## 设置yarn代理
```
yarn config set proxy <proxy-url>
yarn config set https-proxy <proxy-url>
```

## 删除代理
```
yarn config delete proxy
yarn config delete https-proxy
```