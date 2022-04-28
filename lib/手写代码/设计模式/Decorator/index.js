const before = function (fn, beforeFn) {
  return function () {
    beforeFn.apply(this, arguments);
    return fn.apply(this, arguments);
  };
};
let a = before(
  function () {
    alert(3);
  },
  function () {
    alert(2);
  }
);
a = before(a, function () {
  alert(1);
});
a();
