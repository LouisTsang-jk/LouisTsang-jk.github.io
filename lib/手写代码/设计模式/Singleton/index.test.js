const Singleton = require("./index");


describe("Singleton单例模式", () => {
  it("多次new之后获取的实例应该是同一个", () => {
    const a = new Singleton();
    const b = new Singleton();
    expect(a).toEqual(b);
  });
});
