module.exports = function (height, width, font) {
  const max = 45;
  const min = 35;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
