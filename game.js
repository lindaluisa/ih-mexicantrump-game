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
  self.types = ['brick', 'taco', 'sombrero' , 'ayayay'];
  
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

  // self.stopKeyboard = function (event) {
  //   return true;
  //   }
  // };

  document.addEventListener('keydown', self.controlKeyboard);
  // document.addEventListener('keyup', self.stopKeyboard);
  
  self.timer = 10;

  function countTwoMinutes() {
    self.currentTime = Date.now();
    self.delta = self.currentTime - self.startTime;
    self.timer -= self.delta/1000;
    self.updateTime(self.delta/1000);
    self.startTime = self.currentTime;
  }


  function getRandomType() {
    var numTypes = self.types.length;
    var randomNumber = Math.floor(Math.random() * numTypes);
    return self.types[randomNumber];
  }

  self.updateTime = function (){
    if(self.timer >= 10){
        self.timer = 0;
        window.clearInterval(self.timerIntervalId);
    }
  }
  
  self.startTime = Date.now();
  self.timer = 10;
  self.timerIntervalId = window.setInterval(countTwoMinutes, 1000);

  self.items = [];
  function repaint() {
    // ----- logic
    self.trump.update();

    self.frames += 1;
    if (self.frames % self.dropRate === 0) {
      var type = getRandomType();
      self.items.push(new Item(self.ctx, self.width, self.height, type)) 
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

          if (nthItem.type === 'brick') {
            self.score = self.score - 20;
          }
          else if (nthItem.type === 'taco') {
            self.score = self.score + 20;
          }
          else if (nthItem.type === 'sombrero'){
            self.score = self.score + 15;
          }
          else if (nthItem.type === 'ayayay') {
            var sound = new Audio('./images/gritomariachi.mp3');
            sound.play()
            self.score = self.score + 30;
          }
          else {
            self.score = self.score + 30;
          }
        }
    })
    if (self.score <=0 || self.timer <= -1) {
      self.onEnded();
    };

    // ----- paint
    self.ctx.clearRect(0,0, self.width, self.height);
    self.trump.draw();

    for (var ix = 0; ix < self.items.length; ix++){
      self.items[ix].draw();
    }

    // paint score
    self.ctx.font = '35px Arial, sans-serif';
    self.ctx.fillStyle = 'white';
    self.ctx.fillText('Score: ',  10, 50);
    self.ctx.fillStyle = 'white';
    self.ctx.fillText(self.score, 120, 50);

    // paint the time left
    self.ctx.fillText("Countdown: " + Math.round(self.timer), 850, 50)

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

Game.prototype.onGameOver = function (callback) {
  var self = this;
  self.onEnded = callback;
}
