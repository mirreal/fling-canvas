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

  canvas.onmousedown = function(event) {
    var position = { x: event.clientX, y: event.clientY };
    self.handle('mousedown', position);
  };

  window.addEventListener('keydown', function(event) {
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

  restartBtn.onclick = function(event) {
    event.preventDefault();
    self.handle('restart');
  };

  undoBtn.onclick = function(event) {
    event.preventDefault();
    self.handle('undo');
  };

  nextBtn.onclick = function() {
    self.handle('next');
  };

  addBtn.onclick = function() {
    self.handle('addScore');
    addBtn.disabled = 'true';
    nameInput.value = '';
  };

  newGameBtn.onclick = function() {
    self.handle('newGame');
  };

  nameInput.onkeyup = function () {
    if (nameInput.value.length > 0) {
      addBtn.disabled = false; 
    } else {
      addBtn.disabled = true; 
    }
  };
};