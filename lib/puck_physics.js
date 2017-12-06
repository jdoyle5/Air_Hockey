import * as THREE from 'three';
// import * as ENV from './environment';

// let puckStats.puckDirX = 1, puckStats.puckDirY = 1, puckStats.puckSpeed = 2;
// let strikerTwoDirX = 0, strikerTwoDirY = 0, strikerTwoSpeed = 3;
// let strikerOneDirX = 0, strikerOneDirY = 0, strikerOneSpeed = 3;
// const puck = ENV.puck;
// let scorePlayer1 = ENV.scorePlayer1;
// let scorePlayer2 = ENV.scorePlayer2;
// const maxScore = ENV.maxScore;
// const fieldWidth = ENV.fieldWidth, fieldHeight = ENV.fieldHeight;

export function puckPhysics(puck, gameStats, strikerOne, strikerTwo, puckStats, strikerStats) {
  if (puck.position.x <= -gameStats.fieldWidth / 2) {
    gameStats.scorePlayer2++;
    document.getElementById("score-board").innerHTML = `${gameStats.scorePlayer1} - ${gameStats.scorePlayer2}`;
    resetPuck(2, puck, puckStats);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats);
  }

  if (puck.position.x >= gameStats.fieldWidth / 2) {
    gameStats.scorePlayer1++;
    document.getElementById("score-board").innerHTML = `${gameStats.scorePlayer1} - ${gameStats.scorePlayer2}`;
    resetPuck(1, puck, puckStats);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats);
  }

  console.log(puckStats.puckDirX);
  console.log(puckStats.puckDirY);

  if (puckStats.puckDirY > 1) {
    puckStats.puckDirY -= .01;
  }

  if (puckStats.puckDirY < -1) {
    puckStats.puckDirY += .01;
  }

  if (puck.position.y <= -gameStats.fieldHeight/2){
		puckStats.puckDirY = -puckStats.puckDirY;
	}

	if (puck.position.y >= gameStats.fieldHeight/2){
		puckStats.puckDirY = -puckStats.puckDirY;
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
      if (puckStats.puckDirX < 0)
      {
        puckStats.puckDirX = -puckStats.puckDirX;
        puckStats.puckDirY -= strikerStats.strikerOneDirY * 0.7;
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
      if (puckStats.puckDirX > 0)
      {
        puckStats.puckDirX = -puckStats.puckDirX;
        puckStats.puckDirY -= strikerStats.strikerTwoDirY * 0.7;
      }
    }
  }
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



	puck.position.x += puckStats.puckDirX * puckStats.puckSpeed;
	puck.position.y += puckStats.puckDirY * puckStats.puckSpeed;

  if (puckStats.puckDirY > puckStats.puckSpeed * 2) {
		puckStats.puckDirY = puckStats.puckSpeed * 2;
	}
	else if (puckStats.puckDirY < -puckStats.puckSpeed * 2) {
		puckStats.puckDirY = -puckStats.puckSpeed * 2;
	}

}

function resetPuck(player, puck, puckStats) {
  puck.position.x = 0;
  puck.position.y = 0;

  if (player === 1) {
    puckStats.puckDirX = -1;
  } else {
    puckStats.puckDirX = 1;
  }

  puckStats.puckDirY = 1;
}

function gameWonCheck(scorePlayer1, scorePlayer2, maxScore, puckStats) {
  if (scorePlayer1 >= maxScore) {
    puckStats.puckSpeed = 0;
    document.getElementById("score-board").innerHTML = "Human Wins!";
    document.getElementById("winner").innerHTML = "Refresh to play again";
  } else if (scorePlayer2 >= maxScore) {
    puckStats.puckSpeed = 0;
    document.getElementById("score-board").innerHTML = "Robot Wins!";
    document.getElementById("winner").innerHTML = "Refresh to play again";
  }
}
