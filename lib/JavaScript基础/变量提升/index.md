# 变量提升
JavaScript 在执行任何代码段之前，将函数声明放入内存中，这样可以在声明一个函数之前使用该函数。

```
catName("Chloe");

function catName(name) {
    console.log("我的猫名叫 " + name);
}
```