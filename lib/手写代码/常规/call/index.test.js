const _call = require("./index");

describe("call测试", () => {
  it("call测试", () => {
    const obj = {
      name: "foo",
    };
    function hello(...args) {
      return args + " " + this.name;
    }
    expect(_call(hello, obj, "A", "B")).toEqual("A,B foo");
  });
});
