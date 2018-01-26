'use strict'

function main() {

  var gameWindowElement = document.querySelector('#game-window');
  
  var backgroundGame = document.querySelector('body');
  
  var stage;
  var game;

  ///* -------- START GAME -------- *///
  var landingElement;
  var startGameBtn;
  var clickToStart = function () {
    leaveLandingPage();
    moveToGame();
  }

  function landingPage(){
    stage = 'landing';

    landingElement = document.createElement('div');
    landingElement.setAttribute('id', 'landing');

    var title = document.createElement('h1')
    title.innerText = 'DON TRUMPITO';
    landingElement.appendChild(title);
    var description = document.createElement('h3');
    description.innerText = '- From Trump To Chuy -';
    landingElement.appendChild(description);
    
    startGameBtn = document.createElement('button');
    startGameBtn.innerText = 'Start';
    landingElement.appendChild(startGameBtn);

    gameWindowElement.appendChild(landingElement); // linking to HTML

    startGameBtn.addEventListener('click', clickToStart);
  }

  function leaveLandingPage() {
    startGameBtn.removeEventListener('click', clickToStart);
    landingElement.remove();
  }

  ///* -------- GAME -------- *///

  function moveToGame() {
    stage = 'game';

    game = new Game(gameWindowElement);

    game.onGameOver(function() {
      leaveGame();
      moveToGameOver();
    })
   }

  function leaveGame() {
    game.destroy();
  }

  ///* -------- GAME OVER -------- */// 

  var gameOverElement;
  var playAgainBtn;
  var clickToRestart = function () {
    leaveGameOver();
    moveToGame();
  }

  function moveToGameOver() {
    stage = 'gameOver';

    gameOverElement = document.createElement('div');
    gameOverElement.setAttribute('id', 'game-over');
    
    var title = document.createElement('h5');
    title.innerText = 'Try Harder, Trump!!';
    gameOverElement.appendChild(title);

    var yourScore = document.createElement('h4');
    yourScore.innerText = 'SCORE: ' + game.score;
    gameOverElement.appendChild(yourScore);

    playAgainBtn = document.createElement('button');

    playAgainBtn.setAttribute('id', 'play-again');
    playAgainBtn.innerText = 'Play again!';
    gameOverElement.appendChild(playAgainBtn);

    gameWindowElement.appendChild(gameOverElement);

    playAgainBtn.addEventListener('click', clickToRestart);
  }

  function leaveGameOver() {
    playAgainBtn.removeEventListener('click', clickToRestart);
    gameOverElement.remove();
  }

  landingPage();

}

window.onload = main; // fired when document's window rdy for presentation

