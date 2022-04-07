const flat = require("./index");

describe("run flat", () => {
  it("level 0", () => {
    expect(flat([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });
});
