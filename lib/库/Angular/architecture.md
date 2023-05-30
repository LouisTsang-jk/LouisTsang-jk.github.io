# Angular Architecture 中文翻译
# 设计文档(Ivy)：编译器架构

作者: arick@, chuckj@
状态: 草案

## 概述

本文档详细介绍了在Ivy之后的Angular编译器的新架构，以及生态系统需要的兼容性功能，以便逐渐迁移到Ivy而不会有突变。这种兼容性确保在迁移期间，Ivy和非Ivy库能共存。

### Ivy编译模型

广义来说，Ivy模型就是将Angular装饰器（`@Injectable`等）编译为类（`ɵprov`）上的静态属性。这种操作必须在没有全局程序知识的情况下进行，并且在大多数情况下只需知道那个单一的装饰器。

唯一的例外是`@Component`，它需要知道`@NgModule`的元数据，这些元数据声明了组件，以便正确地生成组件定义（`ɵcmp`）。特别是，模块声明该组件以及该模块导入的导出的传递闭包决定了在编译组件模板期间适用的选择器。

向前看，这将是编译Angular代码、将其发送到NPM，以及最终打包到应用程序的模式。

### NPM上的现有代码

现有的Angular库今天存在于NPM上，并以Angular包格式分发，该格式详细说明了发货的工件。今天这包括编译过的`.js`文件，有ES2015和ESM（ES5 + ES2015模块）风格，`.d.ts`文件，和`.metadata.json`文件。`.js`文件已经去除了Angular装饰器信息，`.metadata.json`文件以另一种格式保留装饰器元数据。

### 高级提案

我们将产生两个编译器入口点，`ngtsc`和`ngcc`。

`ngtsc`将是一个将Angular装饰器具现化为静态属性的Typescript-to-Javascript转换器。它是一个最小的`tsc`包装器，其中包括一套Angular转换器。当`angularCompilerOption` `enableIvy`标志在项目的`tsconfig.json`文件中设置为`true`时，虽然Ivy是实验性的，`ngc`作为`ngtsc`运行。

`ngcc`（代表Angular兼容性编译器）被设计来处理来自NPM的代码，并生成等效的Ivy版本，就像代码是用`ngtsc`编译的一样。它将在给定一个`node_modules`目录和一组要编译的包的情况下运行，并将产生一个等效的目录，从中可以读取那些模块的Ivy等价物。`ngcc`是`@angular/compiler-cli`的一个单独的

脚本入口点。

`ngcc`也可以作为一个代码加载器（例如，对于Webpack）的一部分运行，以实时转译从`node_modules`读取的包。

## 详细设计

### Ivy编译模型

`ngtsc`的总体架构是一套调整TypeScript对于一个TypeScript程序所发出的内容的转换器。Angular对`.js`文件和`.d.ts`文件进行了转换，以反映那些然后被擦除的Angular装饰器的内容。这个转换是一个文件一个文件地完成的，除了在进行类型检查和下面讨论的引用反转时，没有全局知识。

例如，以下类声明：

```ts
import {Component, Input} from '@angular/core';

@Component({
  selector: 'greet',
  template: '<div> Hello, {{name}}! </div>'
})
export class GreetComponent {
  @Input() name: string;
}
```

通常会被翻译成像这样的东西：

```js
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let GreetComponent = class GreetComponent {
};
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", String)
], GreetComponent.prototype, "name", void 0);
GreetComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'greet',
        template: '<div> Hello, {{name}}! </div>'
    })
], GreetComponent);
```

它将装饰器转换成在运行时执行的形式。一个`.d.ts`文件也会被发出，可能看起来像

```ts
export class GreetComponent {
  name: string;
}
```

在`ngtsc`中，这是被发出为，

```js
const i0 = require("@angular/core");
class GreetComponent {}
GreetComponent.ɵcmp = i0.ɵɵdefineComponent({
    type: GreetComponent,
    tag: 'greet',
    factory: () => new GreetComponent(),
    template: function (rf, ctx) {
        if (rf & RenderFlags.Create) {
            i0.ɵɵelementStart(0, 'div');
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1('Hello ', ctx.name, '!');
        }
    }
});
```

而`.d.ts`包含：

```ts
import * as i0 from '@angular/core';
export class GreetComponent {
  static ɵcmp: i0.NgComponentDef<
    GreetComponent,
    'greet',
    {input: 'input'}
  >;
}
```

引用反转和类型检查所需的信息包含在`.d.ts`的`ɵcmp`类型声明中。

#### TypeScript架构

TypeScript的总体架构是：

                                                                    |------------|
                               |----------------------------------> | TypeScript |
                               |                                    |   .d.ts    |
                               |                                    |------------|
                               |
    |------------|          |-----|               |-----|           |------------|
    | TypeScript | -parse-> | AST | ->transform-> | AST | ->print-> | JavaScript |
    |   source   |    |     |-----|       |       |-----|           |   source   |
    |------------|    |        |          |                         |------------|
                      |    type-check     |
                      |        |          |
                      |        v          |
                      |    |--------|     |
                      |--> | errors | <---|
                           |--------|

解析步骤是一个传统的递归下降解析器，增强了对增量解析的支持，发出一个抽象语法树（AST）。

类型检查器构造一个符号表，然后对文件中的每一个表达式进行类型分析，报告它发现的错误。这个过程不会被`ngtsc`扩展或修改。

转换步骤是一套AST到AST的转换，执行各种任务，如移除类型声明，将模块和类声明降级到ES5，将`async`方法转换成状态机等。

#### 扩展点

TypeScript支持以下扩展点来改变其输出。你可以，

1. 修改TypeScript看到的源代码(`CompilerHost.getSourceFile`)
2. 改变转换器的列表(`CustomTransformers`)
3. 在输出写入前截取(`WriteFileCallback`)

不推荐改变源代码，因为这会使源映射的管理复杂化，使增量解析的支持变得困难，并且TypeScript的语言服务插件模型不支持这个功能。

#### Angular扩展

Angular通过将Angular特定的转换添加到TypeScript执行的转换列表中，改变了`.js`的输出。

在TypeScript 2.7中，.d.ts文件没有类似的转换器管线，因此在`WriteFileCallback`过程中会更改.d.ts文件。

#### 装饰器实化

Angular支持以下类装饰器：

- `@Component`
- `@Directive`
- `@Injectable`
- `@NgModule`
- `@Pipe`

还有一系列辅助装饰器，使得`@Component`和`@Directive`更易于使用，如`@Input`，`@Output`等；以及一系列装饰器，帮助`@Injectable`类定制注入器，如`@Inject`和`@SkipSelf`。

每一个类装饰器都可以被视为一个类转换器，它接受声明的类并对其进行转换，可能使用来自辅助装饰器的信息，生成一个Angular类。JIT编译器在运行时执行这个转换。AOT编译器在编译时执行这个转换。

每一个类装饰器的类转换器在类上创建一个对应的静态成员，描述运行时如何使用该类。例如，`@Component`装饰器创建一个`ɵcmp`静态成员，`@Directive`创建一个`ɵdir`等。内部地，这些类转换器被称为"Compiler

 Reference Resolution"（CRR）阶段的一部分。

### NPM上的现有代码

为了将现有的Angular应用程序和库迁移到Ivy，我们需要支持处理在NPM上存在的预编译Angular库的方式。这些库通常被编译成Angular包格式并分发。

## 兼容性编译器

兼容性编译器`ngcc`的目标是处理现有的NPM库，并生成一份等价的Ivy库，就像它是用`ngtsc`编译的一样。`ngcc`会在给定的`node_modules`目录和一组要编译的包的情况下运行，并将产生一个等效的目录，可以从中读取这些包的Ivy版本。

`ngcc`也可以作为一个代码加载器运行，例如Webpack，它可以实时转换从`node_modules`读取的包。

## 结论

随着Ivy的出现，Angular编译器的架构变得更加清晰，这篇文档旨在详细阐述这些变化，尤其是关于`ngtsc`和`ngcc`的设计。对这两个新工具的深入理解，对于迁移到Ivy和理解新的编译流程非常重要。

#### 静态值解析的需求

在编译的某些部分，编译器需要静态地解析AST中的特定值，特别是装饰器元数据中的值。这是一个复杂的问题。例如，虽然这种形式的组件很常见：

```javascript
@Component({
  selector: 'foo-cmp',
  templateUrl: 'templates/foo.html',
})
export class Foo {}
```

但下面的形式也是允许的：

```javascript
export const TEMPLATE_BASE = 'templates/';

export function getTemplateUrl(cmp: string): string {
  return TEMPLATE_BASE + cmp + '.html';
}

export const FOO_SELECTOR = 'foo-cmp';
export const FOO_TEMPLATE_URL = getTemplateUrl('foo');

@Component({
  selector: FOO_SELECTOR,
  templateUrl: FOO_TEMPLATE_URL,
})
export class Foo {}
```

`ngc`有一个元数据系统，该系统试图静态理解程序的"值面"。这使它能够跟踪引用并评估需要理解`FOO_TEMPLATE_URL`静态评估为`templates/foo.html`的表达式。`ngtsc`也需要类似的功能，尽管设计将会有所不同。

`ngtsc`的元数据评估器将作为一个部分Typescript解释器构建，它访问Typescript节点并静态评估表达式。这使得元数据评估可以按需发生。它将有一些在`ngc`模型中不存在的限制 - 特别是，评估不会越过`node_module`的边界。

#### 编译模板

`TemplateCompiler`通过执行以下步骤来编译模板：

1. 对模板进行标记化
2. 将标记解析为HTML AST
3. 将HTML AST转换为Angular模板AST
4. 将Angular模板AST翻译为模板函数

Angular模板AST是HTML AST的转换和注释版本，执行以下操作：

1. 将Angular模板语法的简写，如`*ngFor`和`[name]`，转换为它们的规范版本（`<ng-template>`和`bind-name`）。
2. 收集引用（`#`属性）和变量（`let-`属性）。
3. 使用收集的变量和引用，解析并转换绑定表达式中的绑定表达式AST。

作为这次转换的一部分，还生成了一个详尽的选择器目标列表，描述任何组件、指令或管道的选择器的潜在目标。对于本文档的目的，管道的名称被视为管道选择器，绑定表达式中的表达式引用是该选择器的潜在目标。这个列表在下面讨论的引用反转中使用。

`TemplateCompiler`可以从字符串生成模板函数，无需额外信息。然而，正确地解释那个字符串需要下面讨论的选择器作用域。选择器作用域在运行时构建，允许运行时使用从字符串构建的函数，只要它在实例化过程中给出了选择器作用域（例如，一个NgModule）。

#### 选择器问题

为了解释模板的内容，运行时需要知道将哪个组件和指令应用到元素上，以及绑定表达式引用的是哪个管道。候选组件、指令和管道的列表由声明组件的`NgModule`确定。由于模块和组件在不同的源文件中，所以映射哪些组件、指令和管道被引用的任务留给了运行时。不幸的是，这导致了一个"摇树"问题。因为组件和组件引用的类型之间没有直接链接，所以模块中声明的所有组件、指令和管道，以及从模块中导入的任何模块，都必须在运行时可用，否则可能无法正确解释模板。包含所有内容可能导致一个非常大的程序，其中包含许多应用程序实际上并未使用的组件。

移除未使用的代码的过程通常被称为"摇树"。为了确定需要包含哪些代码，摇树器会产生由启动函数引用的所有代码的传递闭包。如果启动代码引用了一个模块，那么摇树器将包含导入或声明到该模块的所有内容

。

如果组件可以包含它所依赖的组件、指令和管道的列表，那么就可以完全忽略这个问题。然后，程序只需要包含初始组件渲染依赖的类型以及那些依赖项所需的任何类型。

确定这个列表的过程被称为引用反转，因为它将从模块（保存依赖项）到组件的链接反转为从组件到其依赖项的链接。

##### 实际的引用反转

视图编译器(View Compiler)将可以选择执行"引用反转"的步骤。如果选择这个选项（可能是通过命令行选项），视图编译器(View Compiler)必须接收组件的选择器作用域作为输入，表示在组件作用域内的所有指令和管道。它扫描组件的模板，并将作用域内所有的指令和管道的列表筛选到只包含模板中的元素匹配的指令和管道。然后，这个列表被实例化成一个指令调用，该指令会将它修补到组件的定义上。

#### 通过类型流动模块和选择器元数据（引用反转）
#### 通过类型流动模块和选择器元数据（引用反转）

引用反转是编译器的一个可选步骤，可以在生产构建中使用，为Angular类做摇树准备。

引用反转的过程是将模板编译器产生的选择器目标列表转换为它所依赖的类型列表。这个映射需要一个选择器作用域，该作用域包含在组件、指令和管道名称中声明的CSS选择器及其对应类的映射。要为一个模块产生这个列表，你需要做以下操作，

1. 添加在`declarations`字段中声明的所有类型。
2. 对于每个导入的模块。
    - 添加导出的组件、指令和管道
    - 对每个导出的模块重复这些子步骤

对于上面产生的列表中的每个类型，解析选择器并将它们全部转换为一个选择器匹配器，该匹配器在给定目标的情况下产生匹配选择器的类型。这被称为选择器作用域。

给定一个选择器作用域，依赖列表是通过从模板编译器产生的选择器目标列表中生成在选择器作用域中匹配的类型集合来形成的。

##### 找到组件的模块

可以通过使用TypeScript语言服务的`findReferences`找到组件的模块。如果其中一个引用是带有`@NgModule`注解的类声明，那么按照上述方式处理类以产生选择器作用域。如果类在`@NgModule`的声明列表中，那么使用该模块产生的作用域。

在处理`@NgModule`类时，可以使用程序的`checker` `getSymbolAtLocation`找到类型引用（如果它是别名符号，可能需要调用`getAliasedSymbol`，`SymbolFlags.Alias`），然后使用`Symbol`的`declarations`字段获取声明节点的列表（对于`class`应该只有一个，对于`interface`可能有几个）。

##### DTS修改

如前所述，TypeScript对于.d.ts文件没有内置的转换管道。转换器可以处理解析后的AST并添加/删除/修改节点，但是在.d.ts文件中发出的类型信息完全来自初始AST，而不是转换后的AST。因此，如果要在.d.ts输出中反映转换器所做的更改，必须通过其他机制来实现。

这使得上面的选项3（`WriteFileCallback`）成为可能进行.d.ts修改的唯一点。我们将在写入.d.ts文件时解析它，并使用AST中的索引来协调插入和删除操作以修复生成的类型。

#### 检查模板的类型

一种非常类似于Renderer2代码生成风格的模型可以用来为模块中声明的每一个

模板生成类型检查块。用于类型检查的模块可以类似于在Renderer2 AST中使用的`type_check_compiler.ts`。`type_check_compiler.ts`只是以可以进行类型检查的方式发出所有绑定表达式，计算正确的隐式目标，并由正确的类型保护进行保护。

计算类型保护和确定管道调用需要全局类型信息。

类型保护需要确定哪些指令应用于一个元素，以确定是否有任何类型保护。

正确地键入一个包含管道的表达式需要确定`transform`方法类型的结果类型。

此外，更高级的类型检查还需要确定应用于元素的指令的类型，以及属性如何映射到指令的属性。

可以使用引用反转描述的选择器作用域找到指令的类型。一旦产生了一个选择器作用域，就可以从选择器作用域确定应用于一个元素的组件和指令。上面描述的`.d.ts`变更还包括属性到属性映射。`TypeGuard`被记录为静态字段，包含在指令的`.d.ts`文件中。

#### 整体ngtsc架构

##### 编译流程

当`ngtsc`开始运行时，它首先解析`tsconfig.json`文件，然后创建一个`ts.Program`。在上述变换可以运行之前，需要发生几件事：

* 必须为包含装饰器的输入源文件收集元数据。
* 在`@Component`装饰器中列出的资源文件必须异步解析。例如，CLI可能希望运行Webpack来产生`@Component`的`styleUrls`属性的`.css`输入。
* 必须运行诊断，创建`TypeChecker`并触摸程序中的每个节点（相当昂贵的操作）。

因为资源加载是异步的（特别是，实际上可能通过子进程并发），因此在进行任何昂贵的操作之前，尽可能启动尽可能多的资源加载是可取的。

因此，编译器的流程看起来是这样的：

1. 创建`ts.Program`
2. 扫描源文件以查找具有易于检测的`@Component`注解的顶级声明。这可以避免创建`TypeChecker`。
    * 对于每个声明，如果有`templateUrl`或`styleUrls`，则启动该URL的资源加载，并将`Promise`添加到队列中。
3. 获取诊断并报告任何初始错误消息。此时，`TypeChecker`已经准备好。
4. 对`@Component`注解进行彻底扫描，使用`TypeChecker`和元数据系统来解析任何复杂表达式。
5. 等待所有资源被解析。
6. 计算需要应用的转换集。
7. 启动Tsickle发出，运行变换。
8. 在为.d.ts文件发出回调时，重新解析发出的.d.ts并合并Angular编译器请求的任何更改。

##### 资源加载

在转换器可以运行之前，需要异步解析`templateUrl`和`styleUrls`到其字符串内容。这个解析将通过一个主机接口进行，编译器将期望这个接口被实现。

```javascript
interface NgtscCompilerHost extends ts.CompilerHost {
  loadResource(path: string): Promise<string>;
}
```

在`ngtsc` CLI中，这个接口将使用从文件系统中简单读取的方式来实现。`ngtsc` API的另一个消费者可能希望实现自定义资源加载。例如，`@angular/cli`将在资源路径上调用webpack以产生结果。

##### Tsickle

###### 特殊设计考虑

目前，Tsickle的设计需要特别考虑其整合到`ngtsc`中。Tsickle伪装成一组转换器，并有一个特定的API用于触发发出。作为一个转换器，Tsickle期望能够将给定的AST序列化为代码字符串（也就是说，它期望能

够在任何给定的输入节点上调用`.getText()`）。这个限制意味着在Tsickle之前运行的转换器不能在AST中引入新的合成节点（例如，它们不能在类上创建新的静态属性）。

Tsickle还将`ts.Decorator`节点转换为类的静态属性，这个操作被称为装饰器降级。

###### Tsickle的计划

因为序列化的限制，Tsickle必须首先运行，然后是Angular转换器。然而，Angular转换器将针对`ts.Decorator`节点操作，而不是Tsickle的降级格式。Angular转换器在编译过程中也会移除装饰器节点，所以Tsickle装饰器降级是没有必要的。因此，Tsickle的降级可以对`ngtsc`禁用。

所以，Angular转换器将在Tsickle转换器之后，但在Typescript转换器之前运行。

##### 监视模式

`ngtsc`将支持TypeScript的`--watch`模式，用于增量编译。在内部，监视模式是通过重用上一次编译的`ts.Program`来实现的。当一个`ts.Program`被重用时，TypeScript确定哪些源文件需要重新进行类型检查和重新发出，并执行这些操作。

这种模式适用于Angular转换器和大多数装饰器编译器，因为它们只使用一个特定文件的元数据进行操作。例外的是`@Component`装饰器，它需要声明组件的模块的选择器作用域。实际上，这意味着所有在一个选择器作用域中的组件必须一起重新编译，因为任何对组件选择器或类型名的更改，例如，都会使作用域中所有组件的所有模板的编译失效。由于TypeScript不会跟踪这些更改，因此保证正确的文件集重新编译是`ngtsc`的责任。

`ngtsc`将通过在其`ts.Program`中跟踪每个模块作用域中包含的源文件集来做到这一点。当一个旧的`ts.Program`被重用时，可以使用上一个程序的选择器作用域记录来确定是否有包含的文件已经更改，从而确定是否需要重新编译作用域中的组件。在未来，这种跟踪可以通过跟踪触发重新编译的特定数据而不是保守地触发任何文件修改来改进，从而减少假阳性的数量。

### 兼容性编译器

#### 兼容性问题

并非所有的Angular代码都在同一时间编译。应用程序依赖于共享库，这些库在NPM上以编译后的形式发布，而不是

作为TypeScript源代码。即使一个应用程序是使用`ngtsc`构建的，它的依赖项也可能没有。

如果一个特定的库没有使用`ngtsc`编译，那么它在其`.js`分发中就不会有上述的实例化装饰器属性。如果它与一个以不同方式编译的依赖项链接，那么在运行时就会失败。

#### 转换pre-Ivy代码

由于Ivy代码只能与其他Ivy代码链接，因此必须将所有来自NPM的pre-Ivy依赖项转换为Ivy依赖项。这种转换必须在对应用程序运行`ngtsc`之前发生，未来的编译和链接操作需要针对这个转换后的依赖项版本进行。

可以将Angular包格式（v6）中的非Ivy代码转译为Ivy代码，尽管`.js`文件不再包含装饰器信息。这是可行的，因为Angular包格式包含每个`.js`文件的`.metadata.json`文件。这些元数据文件包含了在TypeScript源代码中存在但在转译为JavaScript时被移除的信息，这些信息足以生成修补后的`.js`文件，这些文件在装饰的类上添加Ivy静态属性。

#### 来自APF的元数据

目前发布到NPM的`.metadata.json`文件中，除其他信息外，还包括`ngtsc`降级到静态属性的Angular装饰器的参数。例如，`CommonModule`的`.metadata.json`文件包含了最初存在于TypeScript源代码中的其`NgModule`装饰器的信息：

```json
"CommonModule": {
  "__symbolic": "class",
  "decorators": [{
    "__symbolic": "call",
    "expression": {
      "__symbolic": "reference",
      "module": "@angular/core",
      "name": "NgModule",
      "line": 22,
      "character": 1
    },
    "arguments": [{
      "declarations": [...],
      "exports": [...],
      "providers": [...]
    }]
  }]
}
```

#### ngcc操作

`ngcc`默认会扫描`node_modules`并产生与每个使用Angular Package Format (APF)构建的包兼容的Ivy版本。它通过查找包的`module`入口点旁边的`.metadata.json`文件来检测APF。

另外，可以通过传递单个NPM包的名称来启动`ngcc`。它将开始转换该包，并递归到它发现的任何尚未被转换的该包的依赖项。

`ngcc`的输出默认是一个名为`ngcc_node_modules`的目录，但可以根据选项重命名。其结构与`node_modules`相似，转换的包将非编译文件原样复制 - `package.json`等在输出中都得到了保留。只有`.js`和

`.d.ts`文件会被修改，以添加或修复静态属性。

`ngcc`还会尝试处理任何可能存在的`node_modules`下的软链接。为了支持这个特性，`ngcc`将创建它自己的`.ngcc_links.json`文件以记录那些需要在处理软链接时跟踪的关联数据。