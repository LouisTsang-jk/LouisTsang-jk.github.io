# 循环

## while

```
fn main () {
  let mut counter = 0;
  while counter != 3 {
    println!("{}", counter);
    counter += 1;
}
```

## for

**rust**没有三元语句的 for 循环

```
fn main () {
  let a = [1, 2, 3, 4, 5];
  for i in a {
    println!("{}", i);
  }
}
// 1 2 3 4 5
```

```
fn main () {
  let a = [1, 2, 3, 4, 5];
  for i in 0..3 {
    println!("{}", a[i]);
  }
}
// 1 2 3
```

```
fn main () {
  let a = [1, 2, 3, 4, 5];
  for i in a.iter() {
    println!("{}", i);
  }
}
// 1 2 3 4 5
```

## loop
> loop中经常要跳出循环并返回值，因此break后面可以返回值
```
fn main () {
  let mut i = 0;
  let mut sum = 0;
  let result = loop {
      sum += i;
      i += 1;
      if sum >= 10 {
          break i;
      }
  };
  println!("{}", result);
}
// 5
```