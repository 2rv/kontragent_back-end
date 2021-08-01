import Captcha from './lib/Captcha';
import drawBackground from './lib/middle/drawBackground';
import drawText from './lib/middle/drawText';
import drawLines from './lib/middle/drawLines';

import getColors from './lib/getColors';
import getFontSize from './lib/getFontSize';
import generateText from './lib/generateText';

export default {
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
