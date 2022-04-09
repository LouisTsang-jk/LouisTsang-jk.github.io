const bind = require("./index");

const ctx = {
  name: "foo",
};
function hello(...args) {
  return args + ' ' +this.name
}

describe("bind测试", () => {
  it("bind测试", () => {
    const fn = bind(hello, ctx, 'A');
    expect(fn('B')).toEqual('A,B foo');
  });
});
