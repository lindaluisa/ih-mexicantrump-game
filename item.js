'use strict'

function Item (ctx, gameWidth, gameHeight, type) {
  var self = this;

  self.size = 50;

  self.ctx = ctx;
  self.vy = 4;

  self.gameWidth = gameWidth;
  self.gameHeight = gameHeight;

  self.x = Math.random() * (self.gameWidth - self.size);
  self.y = -self.size

  self.collided = false;
} 


Item.prototype.setCollided = function () {
  var self = this;

  self.collided = true;
}

Item.prototype.draw = function () {
  var self = this;

  self.y = self.y + self.vy;

  if (self.collided) {
    self.ctx.fillStyle = 'white'
  }
  else {
    self.ctx.fillStyle = 'brown';
  }

  self.ctx.fillRect(self.x, self.y, self.size, self.size);
}