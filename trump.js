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
  self.direction = null;
  self.speedX = 0;
} 

Trump.prototype.setDirection = function (direction) {
  var self = this;

  self.direction = direction;
}
Trump.prototype.update = function() {
  var self = this;

    switch (self.direction) {
      case 'E':
        self.x += 8;
        break;
      case 'W':
        self.x -= 8;
        break;
    }
    
    if (self.x > self.gameWidth) {
      self.x = 0;
    }

    if (self.x < 0) {
      self.x = self.gameWidth;
    }
}

Trump.prototype.hasCollided = function (nthItem) {
  var self = this;

  return true;
}

Trump.prototype.draw = function () {
  var self = this;

  self.x += self.speedX;

  self.ctx.fillStyle = '#083021';
  self.ctx.fillRect(self.x, self.y, self.width, self.height);
}