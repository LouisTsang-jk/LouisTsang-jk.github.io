// 这里会串行一个个回调函数执行
const { AsyncSeriesHook, AsyncParallelHook } = require("tapable");

debugger;
const hook = new AsyncParallelHook([])
// const hook = new AsyncSeriesHook([]);
let time1 = null;
let time2 = null;

hook.tap("sync1", () => {
  console.log("sync1");
});

hook.tapAsync("async1", (cb) => {
  console.log("async1 begin");
  setTimeout(() => {
    time1 = +new Date();
    console.log("async1");
    cb();
  }, 1000);
});

hook.tapPromise("promise1", () => {
  return new Promise((resolve) => {
    console.log("promise1 begin");
    setTimeout(() => {
      time2 = +new Date();
      console.log("promise1", time2 - time1);
      resolve();
    }, 1000);
  });
});

// 第一种调用方式
// hook.call()

// 第二种调用方式
hook.callAsync(err => console.warn(err))

// 第三种调用方式
// hook.promise().then(() => {});
