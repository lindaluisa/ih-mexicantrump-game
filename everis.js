'use strict'

function Everis (ctx, gameWidth, gameHeight, type, level) {
  var self = this;

  self.size = 100;
  self.width = 100;
  self.height = 100;

  self.y = 800;

  self.ctx = ctx;
  self.vy = 4;

  self.gameWidth = gameWidth;
  self.gameHeight = gameHeight;

  self.x = Math.random() * (self.gameWidth - self.size);
  self.type = type
  self.collided = false;
  self.score = self.score;
}


Everis.prototype.setCollided = function () {
  var self = this;

   self.collided = true;
}

Everis.prototype.draw = function () {
  var self = this;

  var everis = new Image();

  self.type === 'everis'
  everis.src = 'images/everis.png';
  self.y = self.y - self.vy;

   self.ctx.drawImage(everis, self.x, self.y, self.width, self.height);
}