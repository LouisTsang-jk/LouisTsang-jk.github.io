fn main() {
    // let s = String::from("Hello");
    // scream_string(s);
    let s = 5;
    scream_number(s);
    println!("after scream: {}", s);
}

// fn scream_string(context: String) {
//     println!("Scream String: {}", context); // 此处释放
// }

fn scream_number(context: i32) {
    println!("Scream Number: {}", context);
}