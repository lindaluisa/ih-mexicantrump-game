'use strict'

function main() {

  var gameWindowElement = document.querySelector('#game-window');

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
    title.innerText = 'D0N TRUMPIT0';
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

    // window.setTimeout(function () {
    //   leaveGame();
    //   moveToGameOver();
    // }, 5000);
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
    
    var title = document.createElement('h3');
    title.innerText = 'Try harder, Trump!';
    gameOverElement.appendChild(title);

    playAgainBtn = document.createElement('button');
    playAgainBtn.innerText = 'Start again!';
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