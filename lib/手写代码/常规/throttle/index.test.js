const throttle = require("./index");

describe("throttle节流函数", () => {
  it("节流Throttle", (done) => {
    const mockFn = jest.fn();
    const fn = throttle(mockFn, 32);
    setTimeout(() => {
      fn('First', 0);
    }, 16)
    setTimeout(() => {
      fn('Second', 1); // 这个应该要忽略掉的
    }, 32)
    setTimeout(() => {
      fn('Third', 2);
    }, 64)
    setTimeout(() => {
      const calls = mockFn.mock.calls;
      expect(calls.length).toBe(2);
      expect(calls[0]).toEqual(['First', 0]);
      expect(calls[1]).toEqual(['Third', 2]);
      done();
    }, 100);
  });
});
