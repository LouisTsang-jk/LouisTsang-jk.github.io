type _Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}