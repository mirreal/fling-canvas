function getParamFromUrl(
  key,
  defaultVal,
  search = location.search,
  ignoreCase = true
) {
  const regExp = ignoreCase
    ? new RegExp(`[?|&]${key}=([^&]+)`, 'i')
    : new RegExp(`[?|&]${key}=([^&]+)`);
  const match = regExp.exec(search);

  return match ? match[1] : defaultVal;
}

function getParam(key, search = location.search) {
  const value = getParamFromUrl(key, '', search);

  return typeof value !== 'undefined'
    ? decodeURIComponent(value)
    : '';
}


function LocalData() {
  this.storage = window.localStorage;

  this.init();
}

LocalData.prototype.init = function() {
  const puzzle = getParam('puzzle');

  this.set('fling_puzzle', puzzle);
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
  var highScores = this.storage.getItem('fling_highScores');
  if (!highScores) {
    highScores = [];
    for (var i = 0; i < 7; i++) {
      highScores.push({name: 'someone', score: 0});
    }
    this.set('fling_highScores', JSON.stringify(highScores));
  } else {
    highScores = JSON.parse(highScores);
  }
  return highScores;
};