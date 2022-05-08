# 函数

> 命名风格是下划线

- 函数体

```
fn main () {
  let res = add(1, 2);
  println!("{}", res);
}
fn add (x: i32, y: i32) -> i32 {
    x + y
}
```

- 函数体表达式
```
fn main () {
  let x = 1;
  let y = {
    x + 1
  };
  println!("{}", y);
}
// 2
```
> 注意`x + 1`不能加分号

- return
```
fn main () {
  let res = add(1, 2);
  println!("{}", res);
}
fn add (x: i32, y: i32) -> i32 {
    return x + y
}
```