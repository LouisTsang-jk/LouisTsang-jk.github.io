// Parameters<T> 返回一个由其参数type组成的tuple type。
namespace Parameters {
  type _Parameters<T extends Function> = T extends (...args: infer A) => void
    ? A
    : never;
    
  type Foo = (a: string, b: number, c: boolean) => string;

  type A = _Parameters<Foo>; // [a:string, b: number, c:boolean]
  type B = A[0]; // string
  // type C = _Parameters<{ a: string }>; // Error
}
