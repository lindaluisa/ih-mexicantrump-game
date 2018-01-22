'use strict';

function Game(gameWindowElement) {
  var self = this;

  self.gameWindowElement = gameWindowElement;

  self.width = window.innerWidth;
  self.height = window.innerHeight;

  // Create Canvas
  self.canvasElement = document.createElement('canvas');
  self.canvasElement.width = self.width;
  self.canvasElement.height = self.height;
  gameWindowElement.appendChild(self.canvasElement);

  // Create Context; needs to access rendering context
  self.ctx = self.canvasElement.getContext('2d');

   // create the objects
  self.player = new Player(self.ctx, self.width, self.height);
  self.bricks = [];

  //new Bricks (self.ctx, self.width, self.height);

  // @todo start the animation frame 
  // - delete the frame
  // - generate more enemies (sometimes)
  // - ask player and enemies to update positions
  // - ask them to draw()
  // - detect collisions

}

Game.prototype.destroy = function () {
  var self = this;
  // self.finish = true;
  self.canvasElement.remove();
}