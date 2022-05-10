# 所有权

所有权是 Rust 语言为高效使用内存而设计的语法机制

## 所有权规则

- Rust 中的每个值都有一个变量，称为其所有者
- 一次只能有一个所有者
- 当所有者不在程序运行范围时，该值将被删除

## 变量范围

### 示例

```
fn main () {
  {
      let i = 0;
  }
  println!("i: {}", i);
}
// error[E0425]: cannot find value `i` in this scope
```

## 变量与数据交互的方式

### 移动(Move)

将变量 A 赋值到变量 B，如果是基本数据类型(栈)的话是移动。

- 整数
- 浮点
- 布尔
- 字符
- 元组(仅包含基本数据类型)

```
fn main () {
    let s1 = "Hello"; // 这个存在栈空间
    let s2 = s1;
    println!("s1: {}", s1);
    println!("s2: {}", s2);
}
// 正常返回
// s1: Hello
// s2: Hello
```

```
fn main () {
    let s1 = String::from("hello"); // 这个存在堆空间
    let s2 = s1;
    println!("s1: {}", s1);
    println!("s2: {}", s2);
}
// 报错
// error[E0382]: borrow of moved value: `s1`
```

### 克隆(Clone)

```
fn main () {
    let s1 = String::from("hello"); // 这个存在堆空间
    let s2 = s1.clone();
    println!("s1: {}", s1);
    println!("s2: {}", s2);
}
// s1: hello
// s2: hello
```

### 涉及函数

[fn.rs](./fn.rs)
[return.rs](./return.rs)

### 引用

基本和 C 语言指针一样

```
fn main () {
  let s1 = String::from("Hello");
  let s2 = &s1;
  println!("s1 is {}, s2 is {}", s1, s2);
}
```

### 租借
