'use strict'

function ElChapo (ctx, gameWidth, gameHeight, type, level) {
  var self = this;

  self.size = 100;
  self.width = 100;
  self.height = 100;

  self.y = 500;

  self.ctx = ctx;
  self.vy = 4;

  self.gameWidth = gameWidth;
  self.gameHeight = gameHeight;

  self.x = Math.random() * (self.gameWidth - self.size);
  self.type = type
  self.collided = false;
  self.score = self.score;
}


ElChapo.prototype.setCollided = function () {
  var self = this;

   self.collided = true;
}

ElChapo.prototype.draw = function () {
  var self = this;

  var elchapo = new Image();
  self.type === 'elchapo';
  elchapo.src = 'images/elchapo.png';
  self.y = self.y - self.vy;

   self.ctx.drawImage(elchapo, self.x, self.y, self.width, self.height);
}