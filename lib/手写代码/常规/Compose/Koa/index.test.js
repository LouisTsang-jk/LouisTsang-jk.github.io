const compose = require("./index");

describe(`Koa Compose Test`, () => {
  it(`test`, (done) => {
    const output = [];
    function sleep(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    }
    const middlewareA = async (ctx, next) => {
      output.push("A:before");
      await next();
      output.push("A:after");
    };
    const middlewareB = async (ctx, next) => {
      output.push("B:before");
      await sleep(500);
      await next();
      output.push("B:after");
    };
    const middlewareC = async (ctx, next) => {
      output.push("C:before");
      await next();
      output.push("C:after");
    };
    const funcs = compose([middlewareA, middlewareB, middlewareC]);
    funcs().then(() => {
      expect(output).toEqual([
        "A:before",
        "B:before",
        "C:before",
        "C:after",
        "B:after",
        "A:after",
      ]);
      done();
    });
  });
});
