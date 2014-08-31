function Game() {
  this.canvas = new Canvas();
  this.eventHandler = new EventHandler();
  this.HTMLManager = new HTMLManager();
  this.localData = new LocalData();

  this.puzzle = 0;
  this.score = 0;
  this.startTime = 0;
  this.finishTime = 0;
  this.level = 0;
  this.checkBall = null;
  this.ballsLength = 0;
  this.balls = [];
  this.historys = [];


  this.init();
  this.start();
}

Game.prototype.init = function() {
  this.puzzle = this.localData.get('fling_puzzle');
  this.score = this.localData.get('fling_score');

  this.addEventHandler();
  this.HTMLManager.showInitUI();
};

Game.prototype.addEventHandler = function() {
  this.eventHandler.addHandler('mousedown', this.findCheckBall.bind(this));
  this.eventHandler.addHandler('move', this.move.bind(this));
  this.eventHandler.addHandler('undo', this.undo.bind(this));
  this.eventHandler.addHandler('restart', this.start.bind(this));
  this.eventHandler.addHandler('next', this.next.bind(this));
  this.eventHandler.addHandler('newGame', this.newGame.bind(this));
  this.eventHandler.addHandler('addScore', this.addScore.bind(this));
};

Game.prototype.removeEventHandler = function() {
  this.eventHandler.removeHandler('mousedown');
  this.eventHandler.removeHandler('move');
  this.eventHandler.removeHandler('undo');
};

Game.prototype.start = function() {
  this.HTMLManager.showStartUI(this.puzzle, this.score);
  this.removeEventHandler();

  this.historys = [];
  this.balls = puzzles[this.puzzle];
  this.historys.push(JSON.stringify(this.balls));
  this.balls = JSON.parse(this.historys.pop());
  this.level = this.balls.length;

  this.startAnimation();
};

Game.prototype.startAnimation = function() {
  var self = this;

  self.canvas.drawGrid('lightgrey', 50, 50);

  var n = this.balls.length;
  function tryNext(i) {
    if (i >= n) {
      self.draw();
      self.startTime = Date.now();
      return;
    }
    setTimeout(function() {
      self.canvas.drawBall(self.balls[i]);
      tryNext(i+1);
    }, 200);
  }
  tryNext(0);
};

Game.prototype.next = function() {
  this.puzzle += 1;
  this.localData.set("fling_puzzle", this.puzzle);
  this.localData.set("fling_score", this.score);

  this.start();
};

Game.prototype.newGame = function() {
  this.localData.set("fling_puzzle", 0);
  this.localData.set("fling_score", 0);

  this.init();
  this.start();
};

Game.prototype.addScore = function(value) {
  this.highScores = this.localData.getHighScores();

  var highScores = this.highScores;
  var user = {
    "name": value,
    "score": this.score
  };

  for (var i = highScores.length - 1; i >= 0; i--) {
    if (this.score > parseInt(highScores[i].score)) {
      if (i == 6) {
        highScores[i] = user;
      } else {
        var t = highScores[i];
        highScores[i] = user;
        highScores[i+1] = t;
      }
    }
  }

  this.localData.set("fling_highScores",JSON.stringify(highScores));
  this.HTMLManager.updateHighScores(this.highScores);
  this.HTMLManager.showAddScoreUI();
};


Game.prototype.draw = function() {
  var self = this;

  this.canvas.drawGrid('lightgrey', 50, 50);
  this.balls.forEach(function(ball) {
    ball.x = Math.round(ball.x);
    ball.y = Math.round(ball.y);
    ball.vx = 0;
    ball.vy = 0;
    self.canvas.drawBall(ball);
  });
  this.addEventHandler();
};

Game.prototype.undo = function() {
  var ballsText = this.historys.pop();
  if (ballsText) {
    this.balls = JSON.parse(ballsText);
    this.draw();
  }
};

Game.prototype.move = function(direction) {
  if (this.checkBall === null) return this.draw();
  this.removeEventHandler();

  var checkBall = this.checkBall;
  this.checkBall = null;

  switch (direction) {
    case 'right':
      checkBall.vx = 0.2;
      break;
    case 'left':
      checkBall.vx = -0.2;
      break;
    case 'up':
      checkBall.vy = -0.2;
      break;
    case 'down':
      checkBall.vy = 0.2;
  }

  var count = 0,
      hasNeighbor = false;
  var condition1, condition2;

  this.balls.forEach(function(ball) {
    switch (direction) {
      case 'right':
        condition1 = checkBall.y == ball.y;
        condition2 = ball.x - checkBall.x;
        break;
      case 'left':
        condition1 = checkBall.y == ball.y;
        condition2 = checkBall.x - ball.x;
        break;
      case 'up':
        condition1 = checkBall.x == ball.x;
        condition2 = checkBall.y - ball.y;
        break;
      case 'down':
        condition1 = checkBall.x == ball.x;
        condition2 = ball.y - checkBall.y;
    }
    if (condition1 && condition2 == 1) hasNeighbor = true;
    if (condition1 && condition2 > 1) count++;
  });

  if (count === 0 || hasNeighbor === true) return this.draw();

  this.historys.push(JSON.stringify(this.balls));
  this.ballsLength = this.balls.length;

  this.moveAnimation();
};

Game.prototype.moveAnimation = function() {
  var self = this;

  this.canvas.drawGrid('lightgrey', 50, 50);
  var balls = this.balls;

  for (var i = 0; i < balls.length; i++) {
    var ballA = balls[i];

    for (var j = i+1; j < balls.length; j++) {
      var ballB = balls[j];
      if (ballA.y == ballB.y && Math.abs(ballB.x - ballA.x) < 0.99) {
        var temp = ballA.vx;
        ballA.vx = ballB.vx;
        ballB.vx = temp;
      }
      if (ballA.x == ballB.x && Math.abs(ballA.y - ballB.y) < 1) {
        var temp = ballA.vy;
        ballA.vy = ballB.vy;
        ballB.vy = temp;
      }
    }

    ballA.x = ballA.x + ballA.vx;
    ballA.y = ballA.y + ballA.vy;

    this.canvas.drawBall(balls[i]);

    if (balls[i].x > 8 || balls[i].x < -1 || balls[i].y > 8 || balls[i].y < -1) {
      balls.splice(i, 1);
    }
  }

  if (balls.length == this.ballsLength) {
    requestAnimationFrame(self.moveAnimation.bind(self));
  } else {
    this.draw();
    this.finish();
  }
};

Game.prototype.findCheckBall= function(position) {
  var self = this;

  var location = this.windowToCanvas(canvas, position.x, position.y),
      locationX = location.x.toFixed(0),
      locationY = location.y.toFixed(0);

  this.draw();
  this.balls.forEach(function(ball) {
    var m = 50 * ball.x + 25,
        n = 50 * ball.y + 25;
    if (Math.abs(locationX - m) < 25 && Math.abs(locationY - n) < 25) {
      self.checkBall = ball;
      self.canvas.drawCheckBox(m, n);
    }
  });
};

Game.prototype.windowToCanvas = function(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {x: x - bbox.left * (canvas.width  / bbox.width),
          y: y - bbox.top  * (canvas.height / bbox.height)};
};

Game.prototype.finish = function() {
  if (this.balls.length !== 1) return;

  this.finishTime = Date.now();
  this.HTMLManager.showFinishUI();
  this.removeEventHandler();

  var map = {
    3: 16,
    4: 16,
    5: 24,
    6: 40,
    7: 64,
    8: 100,
    9: 100,
    10: 100
  };
  var thisPuzzleScore = map[this.level]*1000 - (this.finishTime - this.startTime);

  if (thisPuzzleScore > 0) {
    this.score += thisPuzzleScore;
  }

  this.HTMLManager.finishMessage(thisPuzzleScore, this.puzzle, this.score);
  this.end();
};

Game.prototype.end = function() {
  if (this.puzzle !== puzzles.length - 1) return;

  this.HTMLManager.showEndUI(this.score);
  this.highScores = this.localData.getHighScores();
  this.HTMLManager.updateHighScores(this.highScores);

  if (this.score < parseInt(this.highScores[6].score)) {
    this.HTMLManager.showAddScoreUI();
  }
};


new Game();