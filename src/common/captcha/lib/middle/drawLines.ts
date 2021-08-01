import getColors from '../getColors';
import randomBetween from '../randomBetween';

export default function (canvas, opt) {
  const ctx = canvas.getContext('2d');
  const colors = getColors(randomBetween(1, 4));

  colors.forEach(function (color) {
    ctx.beginPath();
    ctx.moveTo(randomBetween(0, opt.width), randomBetween(0, opt.height));
    ctx.bezierCurveTo(
      randomBetween(0, opt.height),
      randomBetween(0, opt.height),
      randomBetween(0, opt.width),
      randomBetween(0, opt.height),
      randomBetween(0, opt.width),
      randomBetween(0, opt.height),
    );

    ctx.fillStyle = ctx.strokeStyle = color.css;
    ctx.lineWidth = randomBetween(1, 3);
    return ctx.stroke();
  });
  return canvas;
}
