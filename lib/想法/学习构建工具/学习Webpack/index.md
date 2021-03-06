# Webpack

Webpack 是 JavaScript 应用的模块打包器，可以将 JavaScript 模块按照依赖关系打包成一个单独的文件。

## 为什么需要 Webpack?

1. 模块化，在大型项目维护的时候，模块化去维护代码几乎是唯一办法，而模块化方案`CommonJS`、`AMD`、`CMD`、`UMD`等在浏览器中都不是默认支持，`ESM(ES module)`
2. `TypeScript`、`ES新语法`、`JSX`、`SASS`、`LESS`都无法在浏览器直接运行

## Webpack 如何工作？

1. 初始化参数

从配置文件和`Shell`语句中读取与合并参数，得出最终的参数

2. 开始编译

用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的`run`方法开始执行编译

3. 确定入口

根据配置中的`entry`找出所有的入口文件

4. 编译模块

从入口文件出发，调用所有配置的`Loader`对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理

5. 完成模块编译

在经过第 4 步使用`Loader`翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的**依赖关系**

6. 输出资源

根据入口和模块之间的依赖关系，组装成一个个包含多个模块的`Chunk`，再把每个`Chunk`转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会

7. 输出完成

在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## 如何使用 Webpack？

[快速开始](./quickStart.md)
要了解 Webpack 的运行过程，我们就要了解 Webpack 中两个大概念 Loader、Plugin。

### Loader

使用 Loader 可以让 Webpack 加载除了 JavaScript 的资源(vue-loader、babel-loader、ts-loader 等)，本质来讲 Loader 就是资源转换器。

#### 使用

配置`webpack.config.js`

```
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css&/, // 正则匹配要处理的文件
        use: ['style-loader', 'css-loader?minimize'] // 通过URL querystring传参
      }
    ]
  }
}
```

> Loader 执行顺序是从后往前，所以`css-loader`会先执行，`style-loader`会后执行。

#### [编写 Loader](./编写Loader/index.md)

### Plugin

基于`Tapable`架构，在 Webpack 构建的流程中注入钩子，可以让用户行为介入到构建过程中。

#### 使用

```
module.exports = {
  ...
  plugins: [

  ]
}
```

#### [编写 Plugin](./编写Plugin/index.md)

## 核心概念

- `Compiler`  
  `compiler`代表了完整的`webpack`所有环境配置。仅在启动 webpack 的时候建立一次，配置包括`options`、`loader`、`plugin`等。同时可以通过`compiler`访问整个`webpack`主环境。
- `Compilation`  
  表示当前模块资源、编译生成资源、变换的文件、以及被跟踪以来的状态信息；同时提供很多关键时机的回调供`Plugin`使用。
- `Module`  
  一个模块对应一个文件，webpack 从配置的 Entry 开始递归找出所有依赖的模块
- `Chunk`
  一个 Chunk 由多个模块组合合成，用于代码合并和分割
- `Bundle`
  webpack 最终输出的产物，是一个立即执行函数

```
(function (modules) {
  // 模拟 require 语句
  function __webpack_require__ () {}
  // 执行存放所有模块数组中的第0个模块
  __webpack_require__(0);
})([/** 存放所有模块的数组 */])
```

## 源码解读
### 如何调试
1. 先使用webpack编写使用[demo](./webpack-demo)
2. 在demo项目，`yarn link webpack`
3. 拉取webpack源码，使用`yarn link`
4. 在webpack源码，`/webpack/bin/webpack.js` 中第一行添加`#!/usr/bin/env node --inspect-brk`
5. 在chrome的`chrome://inspect`中，可以看到webpack的源码


### Target
[ ] 如何建立模块之间的依赖图
[ ] tree shaking原理
### debug
1. create创建阶段(lib/webpack.js)
  - 初始化`compiler`
    - 调用`createCompiler`，创建`compiler`(lib/Compiler.js)
      - options标准化
      - 构建context
      - NodeEnvironmentPlugin
  - 

### 结构/流程(如何工作)

1. 初始化参数
2. 开始编译
3. 确定入口
4. 编译模块
5. 完成模块编译
6. 输出资源
7. 输出完成

## 手动实现

# 总结

# 参考

- 《深入浅出 Webpack》
