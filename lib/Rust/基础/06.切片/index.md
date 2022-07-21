# 切片Slice
```
fn main () {
  let s = String::from("HelloWorld");
  let part1 = &s[0..5];
  let part2 = &s[5..10];
  println!("{}={}+{}", s, part1, part2);
}
```
> Rust 中的字符串类型实质上记录了字符在内存中的起始位置和其长度     

> x..y -> [x, y)，同时运算符两边可以无运算数