const debounce = require("./index");

describe("debounce防抖函数", () => {
  it("消抖debounce", (done) => {
    const mockFn = jest.fn();
    const fn = debounce(mockFn, 32);
    setTimeout(() => { // 这个应该要忽略掉的
      fn('First', 0);
    }, 16)
    setTimeout(() => {
      fn('Second', 1);
    }, 30)
    setTimeout(() => {
      fn('Third', 2);
    }, 100)
    setTimeout(() => {
      const calls = mockFn.mock.calls;
      expect(calls.length).toBe(2);
      expect(calls[0]).toEqual(['Second', 1]);
      expect(calls[1]).toEqual(['Third', 2]);
      done();
    }, 200);
  });
});
