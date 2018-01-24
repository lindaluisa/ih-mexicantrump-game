'use strict';

function Game(gameWindowElement) {
  var self = this;

  self.gameWindowElement = gameWindowElement;

  self.dropRate = 60; // drop sth new every 60 frames
  self.frames = 0;
  self.finished = false; // when game executed, keep painting
  self.width = window.innerWidth;
  self.height = window.innerHeight;
  self.score = 100; // score
  
  self.canvasElement = document.createElement('canvas'); //creates canvas
  self.canvasElement.width = self.width;
  self.canvasElement.height = self.height;
  gameWindowElement.appendChild(self.canvasElement);

  self.ctx = self.canvasElement.getContext('2d'); // creates ctx 2 draw

  // create the objects
  self.trump = new Trump(self.ctx, self.width, self.height);

  self.controlKeyboard = function (event) {
    switch (event.keyCode) {
      case 37:
       self.trump.setDirection('W');
        break;
      case 39:
        self.trump.setDirection('E');
        break;
    }
  };

  document.addEventListener('keydown', self.controlKeyboard);
  // document.addEventListener('keydown', self.stopKeyboard);


  function countTwoMinutes() {
    self.currentTime = Date.now();
    self.delta = self.currentTime - self.startTime;
    self.timer += self.delta/1000;
    self.updateTime(self.delta/1000);
    self.startTime = self.currentTime;
  }

    self.updateTime = function (){
      if(self.timer >= 20) // 10 seconds
      {
          self.timer = 0;
          self.clearInterval(self.loop);
      }
    }

    self.startTime = Date.now();
    self.timer = 0;
    self.loop = setInterval(countTwoMinutes, 1000);



  self.items = [];
  function repaint() {
    // ----- logic
    self.trump.update();

    self.frames += 1;
    if (self.frames % self.dropRate === 0) {
      // @todo later var type = getRandomType();
      self.items.push(new Item(self.ctx, self.width, self.height)) //@ask can I just put self.size??
    }
    // items removed when off-screen or collided
    self.items = self.items.filter(function (item) {
      if (item.collided || item.y > self.height) {
        return false;
      }
      else {
        return true;
      }
    });

    // ----- detecting collision
    self.items.forEach(function (nthItem) {
      var collisionRightEdge = (nthItem.x + nthItem.size) >= self.trump.x; 
      var collisionLeftEdge = nthItem.x <= (self.trump.x + self.trump.width);
      var collisionDown = (nthItem.y + nthItem.size) >= self.trump.y;
      var collisionTop = nthItem.y  <= (self.trump.y + self.trump.height);
      
      if (collisionRightEdge && collisionLeftEdge && collisionDown && collisionTop) {
        self.trump.hasCollided(nthItem)
        nthItem.setCollided(); 
      
      
        self.score = self.score - 20;
      }
    })
    
    if (self.score <= 0) {
      game.destroy();
    };

    // ----- paint
    self.ctx.clearRect(0,0, self.width, self.height);
    self.trump.draw();

    for (var ix = 0; ix < self.items.length; ix++){
      self.items[ix].draw();
    }

    // paint score
    self.ctx.font = '35px Arial, sans-serif';
    self.ctx.fillStyle = 'peru';
    self.ctx.fillText('Trump is Mexican to ',  10, 50);
    self.ctx.fillStyle = 'peru';
    self.ctx.fillText(self.score + " %",  120, 100);

    // paint the time left
    self.ctx.fillText("Countdown: " + Math.round(self.timer), 600, 120);

    if (!self.finished) {
      window.requestAnimationFrame(repaint);
    }
  }

  window.requestAnimationFrame(repaint);
}

Game.prototype.destroy = function () {
  var self = this;
  self.finished = true;
  self.canvasElement.remove();
  document.removeEventListener('keydown', self.controlKeyboard);
};


  // @ todo do game over
