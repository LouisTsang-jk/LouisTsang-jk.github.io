type _Readonly<T> = {
  readonly [K in keyof T]: T[K]
}