import * as THREE from 'three';
// import * as ENV from './environment';

let puckDirX = 1, puckDirY = 1, puckSpeed = 2;
let strikerTwoDirX = 0, strikerTwoDirY = 0, strikerTwoSpeed = 3;
let strikerOneDirX = 0, strikerOneDirY = 0, strikerOneSpeed = 3;
// const puck = ENV.puck;
// let scorePlayer1 = ENV.scorePlayer1;
// let scorePlayer2 = ENV.scorePlayer2;
// const maxScore = ENV.maxScore;
// const fieldWidth = ENV.fieldWidth, fieldHeight = ENV.fieldHeight;

export function puckPhysics(puck, gameStats, strikerOne, strikerTwo) {
  if (puck.position.x <= -gameStats.fieldWidth / 2) {
    gameStats.scorePlayer2++;
    document.getElementById("score-board").innerHTML = `${gameStats.scorePlayer1} - ${gameStats.scorePlayer2}`;
    resetPuck(2, puck);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore);
  }

  if (puck.position.x >= gameStats.fieldWidth / 2) {
    gameStats.scorePlayer1++;
    document.getElementById("score-board").innerHTML = `${gameStats.scorePlayer1} - ${gameStats.scorePlayer2}`;
    resetPuck(1, puck);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore);
  }

  if (puck.position.y <= -gameStats.fieldHeight/2){
		puckDirY = -puckDirY;
	}

	if (puck.position.y >= gameStats.fieldHeight/2){
		puckDirY = -puckDirY;
	}


//////////////////////////////////////////////////////////////
////////////////////////// BOUNCE ///////////////////////////
//////////////////////////////////////////////////////////////
  if (puck.position.x <= strikerOne.position.x + 13
  &&  puck.position.x >= strikerOne.position.x)
  {
    if (puck.position.y >= strikerOne.position.y - 12
    &&  puck.position.y <= strikerOne.position.y + 30)
    {
      if (puckDirX < 0)
      {
        puckDirX = -puckDirX;
        puckDirY -= strikerOneDirY * 0.7;
      }
    }
  }

  if (puck.position.x >= strikerTwo.position.x - 33
  &&  puck.position.x <= strikerTwo.position.x)
  {
    console.log(puck.position);
    console.log(strikerTwo.position);
    // debugger;
    if (puck.position.y <= strikerTwo.position.y + 20
    &&  puck.position.y >= strikerTwo.position.y - 20)
    {
      if (puckDirX > 0)
      {
        puckDirX = -puckDirX;
        puckDirY -= strikerTwoDirY * 0.7;
      }
    }
  }
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



	puck.position.x += puckDirX * puckSpeed;
	puck.position.y += puckDirY * puckSpeed;

  if (puckDirY > puckSpeed * 2) {
		puckDirY = puckSpeed * 2;
	}
	else if (puckDirY < -puckSpeed * 2) {
		puckDirY = -puckSpeed * 2;
	}

}

function resetPuck(player, puck) {
  puck.position.x = 0;
  puck.position.y = 0;

  if (player === 1) {
    puckDirX = -1;
  } else {
    puckDirX = 1;
  }

  puckDirY = 1;
}

function gameWonCheck(scorePlayer1, scorePlayer2, maxScore) {
  if (scorePlayer1 >= maxScore) {
    puckSpeed = 0;
    document.getElementById("score-board").innerHTML = "Human Wins!";
    document.getElementById("winner").innerHTML = "Refresh to play again";
  } else if (scorePlayer2 >= maxScore) {
    puckSpeed = 0;
    document.getElementById("score-board").innerHTML = "Robot Wins!";
    document.getElementById("winner").innerHTML = "Refresh to play again";
  }
}
