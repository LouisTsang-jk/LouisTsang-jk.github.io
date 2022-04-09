// 通过 -? 移除了可选属性中的 ?，使得属性从可选变为必选的
type _Required<T> = {
  [P in keyof T]-?: T[P]
}