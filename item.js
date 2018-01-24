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
  self.type = type 
  self.collided = false;
} 

Item.prototype.setCollided = function () {
  var self = this;

  self.collided = true;
}

Item.prototype.draw = function () {
  var self = this;

  self.y = self.y + self.vy;

  if (self.type === 'brick') {
    self.ctx.fillStyle = 'brown';
  }
  else if (self.type === 'taco') {
    self.ctx.fillStyle = 'orange';
  }
  else if (self.type === 'sombrero'){
    self.ctx.fillStyle = 'violet';
  }
  else if (self.type === 'ayayay') {
    self.ctx.fillStyle = 'white';
  }
  else {
    self.ctx.fillStyle = 'black';
  }

  self.ctx.fillRect(self.x, self.y, self.size, self.size);
}