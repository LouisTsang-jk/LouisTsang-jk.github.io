namespace Omit {
  // Type通过从中选择所有属性然后删除Keys
  type _Omit<T, K extends keyof any> = {
    [P in Exclude<keyof T, K>]: T[P];
  };

  type Foo = {
    a: string;
    b: number;
    c: boolean;
  };

  type A = _Omit<Foo, "a" | "b">; // {c: boolean}
  type B = _Omit<Foo, "c">; // {a: string, b: number}
  type C = _Omit<Foo, "c" | "d">; // {a: string, b: number}
}
