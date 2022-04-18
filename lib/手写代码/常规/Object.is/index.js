module.exports = (x, y) => {
  if (x === y) {
    // +0 != -0 || 1/-Infinity !== 1/Infinity
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // NaN === NaN
    return x !== x && y !== y;
  }
};
