'use strict'

function Item (ctx, gameWidth, gameHeight, type, level) {
  var self = this;

  self.size = 100;
  self.width = 100;
  self.height = 100;

  // self.vy = 4;
  // self.y = -self.size


  self.ctx = ctx;
  self.vy = 4;

  self.gameWidth = gameWidth;
  self.gameHeight = gameHeight;

  self.x = Math.random() * (self.gameWidth - self.size);
  self.y = self.size
  self.type = type 
  self.collided = false;
  self.score = self.score;
} 

Item.prototype.setCollided = function () {
  var self = this;

    self.collided = true;
}

  // self.vy = 4;
  // self.y = -self.size
  // self.size = 100;

Item.prototype.draw = function () {
  var self = this;

  var picture = new Image();
    self.y = -self.size
    self.y = self.y + self.vy;

  if (self.type === 'brick') {
    picture.src = 'images/brick.png';
  }
  else if (self.type === 'taco') {
    picture.src = 'images/tacos.png';
  }
  else if (self.type === 'sombrero'){
    self.width = 150;
    picture.src = 'images/sombrero.png';

  }
  else if (self.type === 'ayayay') {
    picture.src = 'images/ayayay.png'; 
  }

  // var bottomUpPic = new Image();
  //   self.y = 800 + self.size
  //   self.y = self.y - self.vy;

  //    if (self.type === 'bottomUpPic') {
  //   picture.src = 'images/bottomUpPic.png';
    
  // }

  self.ctx.drawImage(picture, self.x, self.y, self.width, self.height);

}