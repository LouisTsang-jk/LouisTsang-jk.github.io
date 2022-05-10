fn main () {
  let r1 = get_string();
  let r2 = String::from("Hello");
  let r3 = get_return(r2);
  println!("r1: {}", r1);
  // println!("r2: {}", r2); // r2已经被释放
  println!("r3: {}", r3);
}

fn get_string () -> String {
  return String::from("Hello");
}

fn get_return (str: String) -> String {
  str
}