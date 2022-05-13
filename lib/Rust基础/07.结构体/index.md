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

## 结构体方法
方法和函数类似，都是使用`fn`关键字和名称声明，可以拥有参数和返回值。
> 结构体的第一个参数一定是`self`，代表调用该方法的结构体示例。

```
struct Rectangle {
    width: u32,
    height: u32
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main () {
    let rect1 = Rectangle { width: 30, height: 50 };
    println!("rect1's area is {}", rect1.area());
}
```

## 结构体关联函数
不依赖实例，在`impl`中，但是没有使用`&self`。`String::from`就是结构体关联函数。
```
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn create(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn main() {
    let rect = Rectangle::create(30, 50);
    println!("{:?}", rect);
}
```