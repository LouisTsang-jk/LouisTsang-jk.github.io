namespace Record {
  // 将K中的每个属性都转换为T类型
  // keyof any => string | number | symbol
  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type Key = "a" | "b";
  const obj: _Record<Key, string> & { c: number } = {
    a: "a",
    b: "b",
    c: 3,
  };
}
