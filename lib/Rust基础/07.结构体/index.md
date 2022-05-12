# 结构体
用来规范常用的数据结构，帮助我们在rust中进行类型推导。
# 实例
```
fn main () {
  struct Person {
    name: String,
    age: u32
  }

  let age = 20;
  let tom = Person {
      name: String::from("Tom"),
      age
  };
  let jack = Person {
    name: String::from("Jack"),
    ..tom
  };
  println!("name:{}|age:{}", tom.name, tom.age);
  println!("name:{}|age:{}", jack.name, jack.age);
}
```

## 元组结构体
```
struct Point(i32, i32);
fn main () {
  let origin = Point(0, 0);
  println!("origin:{}|{}", origin.0, origin.1);
}
```