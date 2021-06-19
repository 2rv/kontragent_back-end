module.exports = function(height, width, font) {
  var max = 45;
  var min = 35;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
