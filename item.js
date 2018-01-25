'use strict'

function Item (ctx, gameWidth, gameHeight, type) {
  var self = this;

  self.size = 100;
 
  self.ctx = ctx;
  self.vy = 4;

  self.gameWidth = gameWidth;
  self.gameHeight = gameHeight;

  self.x = Math.random() * (self.gameWidth - self.size);
  self.y = -self.size
  self.type = type 
  self.collided = false;
  self.score = self.score;
} 

Item.prototype.setCollided = function () {
  var self = this;

    self.collided = true;

}

Item.prototype.draw = function () {
  var self = this;

  var picture = new Image();
  
  self.y = self.y + self.vy;
  
  if (self.type === 'brick') {
    picture.src = 'images/brick.png';
  }
  else if (self.type === 'taco') {
    picture.src = 'images/tacos.png';
    
  }
  else if (self.type === 'sombrero'){
    picture.src = 'images/sombrero.png';
    
  }
  else if (self.type === 'ayayay') {
    picture.src = 'images/ayayay.png';
    
  }
  else {
    self.ctx.fillStyle = 'black'
  }
  // self.ctx.fillRect(img, self.size, self.size);
  self.ctx.drawImage(picture, self.x, self.y, self.size, self.size);
  
  
}