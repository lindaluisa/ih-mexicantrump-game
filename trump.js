'use strict';

function Trump (ctx, gameWidth, gameHeight) {
  var self = this;

  // self.level = 0;
  self.width = 100;
  self.height = 100;
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


Trump.prototype.setLevel = function (level) {
  var self = this;

  self.level = level;
  self.width = 50 + (self.level * 25);
  self.height = 100 + (self.level * 50);
  self.y = self.gameHeight - self.height;
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

  //self.ctx.fillRect(self.x, self.y, self.width, self.height);
  //self.ctx.fillStyle = '#083021';

   var pict = new Image();
   //self.level = 0;
    if (self.level === 0) {
      pict.src = './images/trump.png';
      self.width = 130;
    }
    else if (self.level === 1) {
       pict.src = './images/pinata.png';
      //  self.width = 100;
      //  self.height = 100;
     }
    else if (self.level === 2) {
      pict.src = './images/luchador.png';
      // self.width = 100;
      // self.height = 100;
     }
    else if (self.level === 3) {
      pict.src = './images/mariachi.png';
      // self.width = 100;
      // self.height = 100;
     }
  self.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
self.ctx.fillRect(self.x, self.y, self.width, self.height);

self.ctx.drawImage(pict, self.x, self.y, self.width, self.height);
 }