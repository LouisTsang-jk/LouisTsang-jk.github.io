namespace Extract {
  type _Extract<T, U> = T extends U ? T : never;

  type Foo = "a" | "b" | "c";

  type A = _Extract<Foo, "a">; // 'a'
  type B = _Extract<Foo, "a" | "b">; // 'a' | 'b'
  type C = _Extract<Foo, "b" | "c" | "d" | "e">; // 'b' | 'c'
  type D = _Extract<Foo, never>; // never
}
