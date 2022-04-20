module.exports = (target, ...sources) => {
  sources.forEach((source) => {
    for (key in source) {
      Object.keys(source).forEach((key) => {
        target[key] = source[key];
      });
    }
  });
  return target;
};
