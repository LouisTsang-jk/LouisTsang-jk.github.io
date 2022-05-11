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

### 引用和租借

基本和 C 语言指针一样

```
fn main () {
  let s1 = String::from("Hello");
  let s2 = &s1;
  println!("s1 is {}, s2 is {}", s1, s2);
}
```
> 引用不会获得值的所有权，只能租借(Borrow)值的**所有权**
```
fn main() {
    let s1 = String::from("hello");
    let s2 = &s1;
    let s3 = s1;
    println!("{}", s2);
}
// error[E0505]: cannot move out of `s1` because it is borrowed
```
> 租借的所有权不能修改所有者的值
```
fn main() {
    let s1 = String::from("run");
    let s2 = &s1;
    // let mut s1 = String::from("run");
    // let s2 = &mut s1;
    println!("{}", s2);
    s2.push_str("oob"); // 错误，禁止修改租借的值
    println!("{}", s2);
}
```

> 此外可变引用与不可变引用相比除了权限不同以外，可变引用不允许多重引用，但不可变引用可以。这是避免并发状态下发生数据访问碰撞

### 垂悬引用(Dangling References)
没有实际指向一个真正能访问的数据的指针(空指针、已释放空资源)