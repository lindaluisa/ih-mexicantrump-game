'use strict';

function Game(gameWindowElement) {
  var self = this;

  self.gameWindowElement = gameWindowElement;

  self.dropRates = [60, 40, 20]; // drop sth new every 60 frames
  self.frames = 0;
  self.finished = false; // when game executed, keep painting
  self.width = window.innerWidth;
  self.height = window.innerHeight;
  self.score = 100; // score
  self.types = ['brick','brick', 'brick', 'elchapo', 'elchapo', 'taco', 'sombrero' , 'ayayay'];
  self.level = 0;
  self.levelNames = ['Trump', 'Piñata', 'Luchador', 'Mariachi'];
  self.levelThresholds = [300, 1000, 2000];
  self.timer = 40;
  
  self.canvasElement = document.createElement('canvas'); //creates canvas
  self.canvasElement.width = self.width;
  self.canvasElement.height = self.height;
  gameWindowElement.appendChild(self.canvasElement);

  self.ctx = self.canvasElement.getContext('2d'); // creates ctx 2 draw
  
  var sound = new Audio('./images/mariachimusic.mp3');
  sound.volume = 0.2;
  sound.play();

  // create the objects
  self.trump = new Trump(self.ctx, self.width, self.height);
  self.trump.setLevel(self.level);

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
  
  function countTwoMinutes() {
    self.currentTime = Date.now();
    self.delta = self.currentTime - self.startTime;
    self.timer -= self.delta/1000;
    self.startTime = self.currentTime;
  }

  function getRandomType() {
    var numTypes = self.types.length;
    var randomNumber = Math.floor(Math.random() * numTypes);
    return self.types[randomNumber];
  }
  
  self.startTime = Date.now();
  self.timerIntervalId = window.setInterval(countTwoMinutes, 1000);

  self.items = [];
  function repaint() {
    // ----- logic

    if (self.level < 4 && self.score > self.levelThresholds[self.level]) {
      self.level++;
      self.trump.setLevel(self.level);
    }

    self.trump.update();

    self.frames += 1;
    if (self.frames % self.dropRates[self.level] === 0) { //@enhancing 
      var type = getRandomType();
      self.items.push(new Item(self.ctx, self.width, self.height, type,self.level), new ElChapo(self.ctx, self.width, self.height, type,self.level)) 
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
            self.score = self.score - 150;
            var sound = new Audio('./images/wrong.mp3');
            sound.play()
          }
          else if (nthItem.type === 'taco') {
            self.score = self.score + 49;
            var sound = new Audio('./images/bingbing.mp3');
            sound.volume = 0.99;
            sound.play();
          }
          else if (nthItem.type === 'sombrero'){
            self.score = self.score + 101;
            var sound = new Audio('./images/bingbung.mp3');
            sound.play()
          }
          else if (nthItem.type === 'ayayay') {
            var sound = new Audio('./images/gritomariachi.mp3');
            sound.play()
            self.score = self.score + 201;
          }
          else if (nthItem.type === 'elchapo') {
            var sound = new Audio('./images/elchapo.mp3');
            sound.play()
            self.score = self.score - 30;
          }
        } 
    })



    if (self.score <=0 || self.timer < 0) {
      self.onEnded();
    };

    // ----- paint
    self.ctx.clearRect(0,0, self.width, self.height);
    self.trump.draw();

    for (var ix = 0; ix < self.items.length; ix++){
      self.items[ix].draw();
    }

    // paint score
    self.ctx.font = '30px Frijole, sans-serif';
    self.ctx.fillStyle = '#aa1111';

    self.ctx.fillText('Score: ',  10, 50);
    
    self.ctx.fillStyle = '#aa1111';
    self.ctx.fillText("   " + self.score, 120, 50);
    

    // paint the level
    self.ctx.fillText("Level: " + self.levelNames[self.level], 450, 50)

    // paint the time left
    self.ctx.fillText("Countdown: " + Math.round(self.timer), 890, 50)

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
