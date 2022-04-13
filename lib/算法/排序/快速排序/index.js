module.exports = function quickSort(arr) {
  if (arr.length <= 1) return arr;
  arr = arr.slice()
  const [pivot] = arr.splice(arr.length >> 1, 1);
  const left = [];
  const right = [];
  arr.forEach((num) => {
    pivot > num ? left.push(num) : right.push(num);
  });
  return [...quickSort(left), pivot, ...quickSort(right)];
};
