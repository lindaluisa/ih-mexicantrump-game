'use strict';

function Trump (ctx, gameWidth, gameHeight) {
  var self = this;

  self.width = 100;
  self.height = 200;
  self.ctx = ctx;

  self.gameWidth = gameWidth;
  self.gameHeight = gameHeight;

  self.x = self.gameWidth / 2;
  self.y = self.gameHeight - self.height;

  self.speedX = 0;
} 

// @todo Trump.protype.moveLeft = function 
Trump.prototype.moveLeft = function () {
  trump.speedX -= 1;
}
Trump.prototype.moveRight = function() {
  trump.speedX +=1;
}

Trump.prototype.draw = function () {
  var self = this;

  self.x += self.speedX;

  self.ctx.fillStyle = 'black';
  self.ctx.fillRect(self.x, self.y, self.width, self.height);
}