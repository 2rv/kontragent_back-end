const randomBetween = require('./randomBetween');

const randomColor = function () {
  return randomBetween(0, 255);
};

module.exports = function (count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = {
      r: randomColor(),
      g: randomColor(),
      b: randomColor(),
      css: '',
    };
    color.css = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
    colors.push(color);
  }
  return colors;
};
