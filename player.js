'use strict';

function Player (ctx, width, height) {
  var self = this;

  self.size = 100;

  self.ctx = ctx;

  self.gameWidth = width;
  self.gameHeight = height;
} 

Player.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'black';
  self.ctx.fillRect(100, 100, self.size, self.size);
}
