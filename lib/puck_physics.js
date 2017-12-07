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
var puckRadius = 15;
var strikerBotRadius = 25;
var puckSpeedLev = 0.3;

export function puckPhysics(puck, gameStats, strikerOne, strikerTwo, puckStats, strikerStats) {
  if ((puck.position.x <= -gameStats.fieldWidth / 2)
       && (puck.position.y > -50 && puck.position.y < 50)) {
    gameStats.scorePlayer2++;
    document.getElementById("score-board").innerHTML = `${gameStats.scorePlayer1} - ${gameStats.scorePlayer2}`;
    resetPuck(2, puck, puckStats);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats);
  } else if (puck.position.x <= -gameStats.fieldWidth / 2) {
    puckStats.puckDirX = -puckStats.puckDirX;
  }

  if ((puck.position.x >= gameStats.fieldWidth / 2)
      && (puck.position.y > -50 && puck.position.y < 50)) {
    gameStats.scorePlayer1++;
    document.getElementById("score-board").innerHTML = `${gameStats.scorePlayer1} - ${gameStats.scorePlayer2}`;
    resetPuck(1, puck, puckStats);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats);
  } else if (puck.position.x >= gameStats.fieldWidth / 2) {
    puckStats.puckDirX = -puckStats.puckDirX;
  }

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
////////////////////// STRIKER BOUNCE ////////////////////////
//////////////////////////////////////////////////////////////
  // if (puck.position.x <= strikerOne.position.x + 25
  // &&  puck.position.x >= strikerOne.position.x)
  // {
  //   // console.log(puck.position);
  //   // console.log(strikerOne.position);
  //   // debugger;
  //   if (puck.position.y >= strikerOne.position.y - 25
  //   &&  puck.position.y <= strikerOne.position.y + 25)
  //   {
  //     if (puckStats.puckDirX < 0)
  //     {
  //       puckStats.puckDirX = -puckStats.puckDirX + (strikerStats.strikerOneDirX * 0.5);
  //       puckStats.puckDirY -= strikerStats.strikerOneDirY * 0.5;
  //     }
  //   }
  // }
  //
  // if (puck.position.x >= strikerTwo.position.x - 35
  // &&  puck.position.x <= strikerTwo.position.x)
  // {
  //   if (puck.position.y <= strikerTwo.position.y + 25
  //   &&  puck.position.y >= strikerTwo.position.y - 25)
  //   {
  //     if (puckStats.puckDirX > 0)
  //     {
  //       puckStats.puckDirX = -puckStats.puckDirX - (strikerStats.strikerOneDirX * 0.5);
  //       puckStats.puckDirY -= strikerStats.strikerTwoDirY * 0.5;
  //     }
  //   }
  // }
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////









//////////////////////////////////////////////////////////////
////////////////////// STRIKER BOUNCE ////////////////////////
///////////////////// USING DIST FORM ////////////////////////
const dist = function(pos1x, pos2x, pos1y, pos2y) {
  return Math.sqrt(
    Math.pow(pos1x - pos2x, 2) + Math.pow(pos1y - pos2y, 2)
  );
};

let distPuckStrOne = dist(strikerOne.position.x, puck.position.x,
  strikerOne.position.y, puck.position.y);

let distPuckStrTwo = dist(strikerTwo.position.x, puck.position.x,
  strikerTwo.position.y, puck.position.y);



if (distPuckStrOne <= (strikerBotRadius + puckRadius)) {
    // If the striker's speed is greater than that of the puck's, we
    // want to move the puck out from under the striker so it doesn't
    // get stuck.
    if (puckStats.puckDirX < 0) {
      if (Math.abs(strikerStats.strikerOneDirX) > Math.abs(puckStats.puckDirX)) {
        // while (distPuckStrOne < (strikerBotRadius + puckRadius)) {
          puck.position.x += ((strikerBotRadius + puckRadius * 1.3) - distPuckStrOne);
        // }
      }
    } else if (puckStats.puckDirX > 0) {
      if (Math.abs(strikerStats.strikerOneDirX) > Math.abs(puckStats.puckDirX)) {
        // while (distPuckStrOne < (strikerBotRadius + puckRadius)) {
          puck.position.x -= ((strikerBotRadius + puckRadius * 1.3) - distPuckStrOne);
        // }
      }
    }

    if (puckStats.puckDirY < 0) {
      if (Math.abs(strikerStats.strikerOneDirY) > Math.abs(puckStats.puckDirY)) {
        // while (distPuckStrOne < (strikerBotRadius + puckRadius)) {
          puck.position.y += ((strikerBotRadius + puckRadius * 1.3) - distPuckStrOne);
        // }
      }
    } else if (puckStats.puckDirY > 0) {
      if (Math.abs(strikerStats.strikerOneDirY) > Math.abs(puckStats.puckDirY)) {
        // while (distPuckStrOne < (strikerBotRadius + puckRadius)) {
          puck.position.y -= ((strikerBotRadius + puckRadius * 1.3) - distPuckStrOne);
        // }
      }
    }

    puckStats.puckDirX = -puckStats.puckDirX + (strikerStats.strikerOneDirX * puckSpeedLev);
    puckStats.puckDirY = -puckStats.puckDirY + (strikerStats.strikerOneDirY * puckSpeedLev);
  }

if (distPuckStrTwo <= (strikerBotRadius + puckRadius)) {

  // If the striker's speed is greater than that of the puck's, we
  // want to move the puck out from under the striker so it doesn't
  // get stuck.
  if (puckStats.puckDirX < 0) {
    if (Math.abs(strikerStats.strikerTwoDirX) > Math.abs(puckStats.puckDirX)) {
      // while (distPuckStrTwo < (strikerBotRadius + puckRadius)) {
        puck.position.x += ((strikerBotRadius + puckRadius * 1.3) - distPuckStrTwo);
      // }
    }
  } else if (puckStats.puckDirX > 0) {
    if (Math.abs(strikerStats.strikerTwoDirX) > Math.abs(puckStats.puckDirX)) {
      // while (distPuckStrTwo < (strikerBotRadius + puckRadius)) {
        puck.position.x -= ((strikerBotRadius + puckRadius * 1.3) - distPuckStrTwo);
      // }
    }
  }

  if (puckStats.puckDirY < 0) {
    if (Math.abs(strikerStats.strikerTwoDirY) > Math.abs(puckStats.puckDirY)) {
      // while (distPuckStrTwo < (strikerBotRadius + puckRadius)) {
        puck.position.y += ((strikerBotRadius + puckRadius * 1.3) - distPuckStrTwo);
      // }
    }
  } else if (puckStats.puckDirY > 0) {
    if (Math.abs(strikerStats.strikerTwoDirY) > Math.abs(puckStats.puckDirY)) {
      // while (distPuckStrTwo < (strikerBotRadius + puckRadius)) {
        puck.position.y -= ((strikerBotRadius + puckRadius * 1.3) - distPuckStrTwo);
      // }
    }
  }

    puckStats.puckDirX = -puckStats.puckDirX - (strikerStats.strikerTwoDirX * puckSpeedLev);
    puckStats.puckDirY = -puckStats.puckDirY - (strikerStats.strikerTwoDirY * puckSpeedLev);
  }

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



if (puckStats.puckDirY > puckStats.puckSpeed * 2) {
  puckStats.puckDirY = puckStats.puckSpeed * 2;
}
else if (puckStats.puckDirY < -puckStats.puckSpeed * 2) {
  puckStats.puckDirY = -puckStats.puckSpeed * 2;
}

	puck.position.x += puckStats.puckDirX * puckStats.puckSpeed;
	puck.position.y += puckStats.puckDirY * puckStats.puckSpeed;


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
