describe(`原型链`, () => {
  const P = function () {}
  const p = new P();
  // P/p/Object/Function之间的关系
  it(`test-1`, () => {
    expect(p.__proto__).toEqual(P.prototype);
    expect(p.__proto__.__proto__).toEqual(Object.prototype);
    expect(p.__proto__.__proto__.__proto__).toBeNull();
    expect(P.__proto__).toEqual(Function.prototype);
    expect(P.__proto__.__proto__).toEqual(Object.prototype);
   })
})