const _apply = require("./index");

describe("apply测试", () => {
  it("apply测试", () => {
    const obj = {
      name: "foo",
    };
    function hello(...args) {
      return args + " " + this.name;
    }
    expect(_apply(hello, obj, ["A", "B"])).toEqual("A,B foo");
  });
});
