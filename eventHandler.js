function EventHandler() {
  this.events = {};

  this.listen();
}

EventHandler.prototype.addHandler = function(event, callback) {
  this.events[event] = callback;
};

EventHandler.prototype.removeHandler = function(event) {
  this.events[event] = null;
};

EventHandler.prototype.handle = function(event, data) {
  var callback = this.events[event];
  if (callback) callback(data);
};

EventHandler.prototype.listen = function() {
  var self = this;

  var canvas = document.querySelector('canvas');
  canvas.onmousedown = function(event) {
    var position = { x: event.clientX, y: event.clientY };
    self.handle('mousedown', position);
  };

  window.addEventListener('keydown', function(event) {
    event.preventDefault();
    var map = {
      37: 'left',
      65: 'left',
      38: 'up',
      87: 'up',
      39: 'right',
      68: 'right',
      40: 'down',
      83: 'down',
      82: 'undo'
    };
    var mapped = map[event.keyCode];
    if (mapped === undefined) return;
    if (mapped == 'undo') self.handle('undo');
    else self.handle('move', mapped);
  }, false);

  var restartBtn = document.getElementById('restartBtn');
  restartBtn.onclick = function(event) {
    event.preventDefault();
    self.handle('restart');
  };

  var undoBtn = document.getElementById('undoBtn');
  undoBtn.onclick = function(event) {
    event.preventDefault();
    self.handle('undo');
  };

  var nextBtn = document.getElementById('nextBtn');
  nextBtn.onclick = function() {
    self.handle('next');
  };

  var nameInput = document.getElementById('nameInput');
  var addBtn = document.getElementById('addBtn');
  nameInput.onkeyup = function () {
    if (nameInput.value.length > 0) {
      addBtn.disabled = false;
    } else {
      addBtn.disabled = true;
    }
  };

  addBtn.onclick = function() {
    var value = nameInput.value;
    self.handle('addScore', value);
    addBtn.disabled = 'true';
    nameInput.value = '';
  };

  var newGameBtn = document.getElementById('newGameBtn');
  newGameBtn.onclick = function() {
    self.handle('newGame');
  };
};