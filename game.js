'use strict';

function Game(gameWindowElement) {
  var self = this;

  self.gameWindowElement = gameWindowElement;

  self.dropRate = 60; // drop something new every 60 frames
  self.frames = 0;
  self.finished = false; // when game executed, keep painting
  self.width = window.innerWidth;
  self.height = window.innerHeight;

  self.canvasElement = document.createElement('canvas'); //creates canvas
  self.canvasElement.width = self.width;
  self.canvasElement.height = self.height;
  gameWindowElement.appendChild(self.canvasElement);

  self.ctx = self.canvasElement.getContext('2d'); // creates ctx 2 draw

   // create the objects
  self.trump = new Trump(self.ctx, self.width, self.height);
  self.items = [];

  // @todo add event lisneter for key down, if key is arrowLeft, self.trump.moveLeft();

  function repaint() {
    
    // ----- logic

    self.frames += 1;
    if (self.frames % self.dropRate === 0) {
      // @todo later var type = getRandomType();
      self.items.push(new Item(self.ctx, self.width, self.height))
    }

    // @todo remove items that are no longer in the screen from the items array
    // @todo detect collisions


    // ----- paint

    self.ctx.clearRect(0,0, self.width, self.height);
    self.trump.draw();

    for (var ix = 0; ix < self.items.length; ix++){
      self.items[ix].draw();
    }

    if (!self.finished) {
      window.requestAnimationFrame(repaint);
    }
  }

  window.requestAnimationFrame(repaint);
}

Game.prototype.destroy = function () {
  var self = this;
  self.finished = true;
  self.canvasElement.remove();
}