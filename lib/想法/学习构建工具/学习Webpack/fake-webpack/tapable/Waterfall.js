const { SyncWaterfallHook } = require("tapable");

const compute = new SyncWaterfallHook(['n']);

compute.tap("square", (n) => n * n);
compute.tap("addOne", (n) => n + 1);

console.log(compute.call(5));
