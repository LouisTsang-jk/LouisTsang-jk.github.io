# BFC(Block formatting Contexts)

块格式化上下文

> BFC 独立不干扰外界也不受外界干扰

## 触发方式

- float 的值不为`none`
- overflow 的值为`auto`、`scroll`或`hidden`
- display 的值为`table-cell`、`table-caption`、`inline-block`中的任何一个
- position 的值不为`relative`和`static`

## 特性

1. 阻止外边距叠加
2. 不会重叠浮动元素

# IFC(Inline Formatting Contexts)

内联格式化上下文

> 块级元素中仅包含内联级别元素，当 IFC 中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个 IFC。

## 渲染规则

- 子元素横向排列
- 子元素只会计算横向样式空间(padding + border + margin)，垂直方向样式空间不会被计算
- 垂直方向上，子元素会以不同形式来对其(vertical-align)

# FFC(Flex Formatting Contexts)

弹性盒模型

## 触发条件

父级元素设置成`display:flex`或者`display:inline-flex`

# 参考

[CSS 面试](https://juejin.im/post/5ea45801e51d4546d4399055?utm_source=gold_browser_extension#heading-15)
