const Captcha = require('./lib/Captcha');
const drawBackground = require('./lib/middle/drawBackground');
const drawText = require('./lib/middle/drawText');
const drawLines = require('./lib/middle/drawLines');

const getColors = require('./lib/getColors');
const getFontSize = require('./lib/getFontSize');
const generateText = require('./lib/generateText');

module.exports = {
  Captcha: Captcha,

  // stock middleware
  drawBackground: drawBackground,
  drawText: drawText,
  drawLines: drawLines,

  // utils
  getColors: getColors,
  getFontSize: getFontSize,
  generateText: generateText,

  // use default settings
  create: function (opt) {
    const cap = new Captcha(opt);
    cap.use(drawBackground);
    cap.use(drawLines);
    cap.use(drawText);
    cap.use(drawLines);
    return cap;
  },
};
