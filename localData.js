function LocalData() {
  this.storage = window.localStorage;
}

LocalData.prototype.get = function(key) {
  var item = parseInt(this.storage.getItem(key));
  if (!item) {
    item = 0;
    this.set(key, item);
  }
  return item;
};

LocalData.prototype.set = function(key, item) {
  this.storage.setItem(key, item);
};

LocalData.prototype.getHighScores = function() {
  var highScores = this.storage.getItem("fling_highScores");
  if (!highScores) {
    highScores = [];
    for (var i = 0; i < 7; i++) {
      highScores.push({name: 'someone', score: 0})
    }
    this.set("fling_highScores", JSON.stringify(highScores));
  } else {
    highScores = JSON.parse(highScores);
  }
  return highScores;
};