module.exports = function filterThird(arr) {
  let flag = false;
  let prev = null;
  const filterIndex = [];
  for (let i = 0; i < arr.length; i++) {
    if (prev === arr[i] && flag) {
      filterIndex.push(i);
    }
    if (prev === arr[i]) {
      flag = true;
    } else {
      flag = false;
    }
    prev = arr[i];
  }
  return arr.filter((i, index) => !filterIndex.includes(index));
}