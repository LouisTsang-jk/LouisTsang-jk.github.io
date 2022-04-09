namespace Exclude {
  type _Exclude<T, E> = T extends E ? never : T;
  type Foo = "a" | "b" | "c";

  type A = _Exclude<Foo, "a">; // 'b' | 'c'
  type B = _Exclude<Foo, "c">; // 'a' | 'b
  type C = _Exclude<Foo, "c" | "d">; // 'a' | 'b'
  type D = _Exclude<Foo, "a" | "b" | "c">; // never
}
