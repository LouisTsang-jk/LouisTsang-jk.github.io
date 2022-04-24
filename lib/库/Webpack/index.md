# Webpack

## Event

Webpack 的事件机制基于`Tapable`事件流方案

## Loader

`loader`能让 webpack 处理非 JavaScript 文件(webpack 只能解析 JavaScript)。`loader`将所有类型的文件转换为 webpack 能处理的有效模块，**然后再利用 webpack 的打包能力进行处理**。

> webpack 会以顺序链式调用每一个 Loader，上一个 Loader 的返回内容作为下一个 Loader 的入参

## Plugin

- 插件必须是函数或者包含 apply 方法的对象，这样才能访问到 compiler 实例
- 传给每个插件的 compiler 和 compilation 对象都是同个引用

### complier

暴露 Webpack 整个生命周期相关的钩子(compiler-hooks)

### compilation

暴露模块和依赖相关的粒度更小的事件钩子(compilation-hooks)

## SourceMap

将编译、打包、压缩后的代码映射回源代码的技术，`sourceMap`可以帮助快速定位到源代码的位置，提高开发效率，并不是 Webpack 特有功能。

## 工作流程

### 初始化参数

从配置文件和`Shell`语句中读取与合并参数，得出最终的参数

### 开始编译

用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的`run`方法开始执行编译

### 确定入口

根据配置中的`entry`找出所有的入口文件

### 编译模块

从入口文件出发，调用所有配置的`Loader`对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理

### 完成模块编译

在经过第 4 步使用`Loader`翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的**依赖关系**

### 输出资源

根据入口和模块之间的依赖关系，组装成一个个包含多个模块的`Chunk`，再把每个`Chunk`转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会

### 输出完成

在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## MF

Module Federation 字面意思就是模块联邦，webpack5 新特性，目的就是多个独立的构建组成一个应用程序，这些独立构件之间又不存在依赖关系，可以单独开发和部署。

> 可以用于微应用

## HMR

TODO
