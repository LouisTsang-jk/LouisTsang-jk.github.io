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
要了解Webpack的运行过程，我们就要了解Webpack中两个大概念Loader、Plugin。
### Loader

使用 Loader 可以让 Webpack 加载除了 JavaScript 的资源(vue-loader、babel-loader、ts-loader 等)，本质来讲Loader就是资源转换器。
[编写Loader](./编写Loader/index.md)
### Plugin

## 源码解读

### 结构/流程(如何工作)

## 手动实现

# 总结

# 参考

- 《深入浅出 Webpack》
