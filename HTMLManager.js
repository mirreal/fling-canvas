function HTMLManager() {
  this.gameComplete = document.getElementById('gameComplete');
  this.puzzleScore = document.getElementById('puzzleScore');
  this.gameEnd = document.getElementById('gameEnd');
  this.scoreShow = document.getElementById('scoreShow');
  this.nameInput = document.getElementById('nameInput');
  this.addBtn = document.getElementById('addBtn');
  this.highScoreList = document.getElementById('highScoreList');
  this.header = document.querySelector('header');
  this.canvas = document.querySelector('canvas');
}

HTMLManager.prototype.hide = function(elem) {
  elem.style.display = 'none';
};

HTMLManager.prototype.show = function(elem) {
  elem.style.display = '';
};

HTMLManager.prototype.updateHighScores = function(highScores) {
  var self = this;

  this.highScoreList.innerHTML = '';
  highScores.forEach(function(user) {
    var li = document.createElement('li');
    li.innerHTML = user.score + ' by ' + user.name;
    self.highScoreList.appendChild(li);
  });
};

HTMLManager.prototype.showInitUI = function() {
  this.show(this.canvas);
};

HTMLManager.prototype.showStartUI = function(puzzle, score) {
  this.header.innerHTML = '<h2>Puzzle: ' + (puzzle+1)  + ' Score: ' + score + '</h2>';

  this.hide(this.gameComplete);
  this.hide(this.gameEnd);
};

HTMLManager.prototype.showFinishUI = function() {
  this.show(this.gameComplete);
};

HTMLManager.prototype.showEndUI = function(score) {
  this.show(this.gameEnd);
  this.show(this.nameInput);
  this.show(this.addBtn);

  this.hide(this.gameComplete);
  this.hide(this.canvas);

  this.header.innerHTML = '<h2>Congratulations!</h2>';
  this.scoreShow.innerHTML = score;
};

HTMLManager.prototype.finishMessage = function(thisPuzzleScore, puzzle, score) {
  if (thisPuzzleScore > 0) {
    this.puzzleScore.innerHTML = 'You got ' + thisPuzzleScore + ' !';
  } else {
    this.puzzleScore.innerHTML = 'You got zero! haha...';
  }

  this.header.innerHTML = '<h2>Puzzle: ' + (puzzle+1)  + ' Score: ' + score + '</h2>';
};

HTMLManager.prototype.showAddScoreUI = function() {
  this.hide(this.addBtn);
  this.hide(this.nameInput);
};