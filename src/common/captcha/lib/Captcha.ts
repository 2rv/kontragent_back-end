const createCanvas = require('canvas').createCanvas;
const registerFont = require('canvas').registerFont;
const path = require('path');
import generateText from './generateText';

registerFont(path.join('./assets/fonts/customFont.ttf'), {
  family: 'Custom Font',
});

function CaptchaFn(options) {
  // defaults
  this.options = options || {};
  if (!this.options.height) this.options.height = 100;
  if (!this.options.width) this.options.width = 180;
  if (!this.options.text) this.options.text = generateText();
  if (!this.options.font) this.options.font = 'sans';

  this._middleware = [];
}

CaptchaFn.prototype.use = function (fn) {
  this._middleware.push(fn);
  return this;
};

CaptchaFn.prototype.reset = function () {
  this.canvas = createCanvas(this.options.width, this.options.height);
  return this;
};

CaptchaFn.prototype.generate = function () {
  this.reset();
  this._middleware.forEach(
    function (fn) {
      this.canvas = fn(this.canvas, this.options);
    }.bind(this),
  );
  return this;
};

CaptchaFn.prototype.text = function () {
  return this.options.text;
};

CaptchaFn.prototype.font = function () {
  return this.options.font;
};

CaptchaFn.prototype.height = function () {
  return this.options.height;
};

CaptchaFn.prototype.width = function () {
  return this.options.width;
};

CaptchaFn.prototype.uri = function () {
  return this.canvas.toDataURL.apply(this.canvas, arguments);
};

CaptchaFn.prototype.buffer = function () {
  return this.canvas.toBuffer.apply(this.canvas, arguments);
};

CaptchaFn.prototype.stream = function (type) {
  if (!type) type = 'png';
  type = type.toLowerCase();

  if (type === 'png') {
    return this.canvas.createPNGStream();
  } else if (type === 'jpeg') {
    return this.canvas.createJPEGStream();
  } else {
    throw new Error('Invalid stream type');
  }
};

export default CaptchaFn;
