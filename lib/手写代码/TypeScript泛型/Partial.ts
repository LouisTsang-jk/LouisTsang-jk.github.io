type _Partial<T> = {
  [P in keyof T]: T[P]
}