# 结构体
用来规范常用的数据结构，帮助我们在rust中进行类型推导。
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
  println!("name:{}", tom.name);
  println!("age:{}", tom.age);
}
```