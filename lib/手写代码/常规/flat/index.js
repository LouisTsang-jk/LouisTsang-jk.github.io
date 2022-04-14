module.exports = function flat(arr, depth = 1) {
  if (depth === 0) return arr;
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur) && depth) {
      return (acc = [...acc, ...flat(cur, depth - 1)]);
    } else {
      return (acc = [...acc, cur]);
    }
  }, []);
};
