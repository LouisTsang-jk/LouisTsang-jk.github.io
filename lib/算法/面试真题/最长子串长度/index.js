module.exports = function (str) {
  const strArr = str.split("");
  let result = 0;
  const assistArr = [];
  for (const s of strArr) { // p w w k e w
    if (assistArr.includes(s)) {
      result = Math.max(result, assistArr.length);
      while (assistArr.includes(s)) {
        assistArr.shift();
      }
    } else {
      assistArr.push(s);
    }
  }
  return Math.max(result, assistArr.length);
};
