function Canvas() {
  this.canvas = document.getElementById('canvas');
  this.context = this.canvas.getContext('2d');

  this.colors = ['#C03', 'DarkKhaki', 'yellow', 'grey', 'pink',
    'green', 'orange', 'brown', 'Magenta', 'DeepSkyBlue'];
}

Canvas.prototype.drawGrid = function(color, stepx, stepy) {
  var ctx = this.context;

  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;

  for (var i = stepx + 0.5; i < ctx.canvas.width; i += stepx) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
    ctx.stroke();
    ctx.closePath();
  }

  for (var i = stepy + 0.5; i < ctx.canvas.height; i += stepy) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(ctx.canvas.width, i);
    ctx.stroke();
    ctx.closePath();
  }
  ctx.restore();
};

Canvas.prototype.drawBall = function(ball) {
  var ctx = this.context;

  var m = 50 * ball.x + 25,
      n = 50 * ball.y + 25;
  ctx.save();
  ctx.fillStyle = '#C03';
  ctx.fillStyle = this.colors[ball.color];
  ctx.shadowColor = 'black';
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(m, n, 23, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

Canvas.prototype.drawCheckBox = function(m, n) {
  var ctx = this.context;

  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeRect(m-25, n-25, 50, 50);
  ctx.restore();
};