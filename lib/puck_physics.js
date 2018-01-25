

var puckRadius = 15;
var strikerRadius = 25;
var puckSpeedLev = 0.1;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function puckPhysics(puck, gameStats, strikerOne, strikerTwo, puckStats, strikerStats) {

  var bottomEdge = -gameStats.fieldHeight/2;
  var topEdge = gameStats.fieldHeight/2;
  var leftEdge = -gameStats.fieldWidth / 2;
  var rightEdge = gameStats.fieldWidth / 2;


  if ((puck.position.x <= -gameStats.fieldWidth / 2)
       && (puck.position.y > -50 && puck.position.y < 50)) {
    gameStats.scorePlayer2++;
    document.getElementById("score-board").innerHTML = `${gameStats.scorePlayer1} - ${gameStats.scorePlayer2}`;
    resetPuck(2, puck, puckStats);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats);
  } else if (puck.position.x <= -gameStats.fieldWidth / 2) {
    let distBetwLeft = puck.position.x - leftEdge;
    puck.position.x += -distBetwLeft;
    puckStats.puckDirX = -puckStats.puckDirX;
  }

  if ((puck.position.x >= gameStats.fieldWidth / 2)
      && (puck.position.y > -50 && puck.position.y < 50)) {
    gameStats.scorePlayer1++;
    document.getElementById("score-board").innerHTML = `${gameStats.scorePlayer1} - ${gameStats.scorePlayer2}`;
    resetPuck(1, puck, puckStats);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats);
  } else if (puck.position.x >= gameStats.fieldWidth / 2) {
    let distBetwRight = puck.position.x - rightEdge;
    puck.position.x += -distBetwRight;
    puckStats.puckDirX = -puckStats.puckDirX;
  }

  if (puckStats.puckDirY > 2) {
    puckStats.puckDirY -= .05;
  }

  if (puckStats.puckDirY < -2) {
    puckStats.puckDirY += .05;
  }

  if (puckStats.puckDirX < 2 && puckStats.puckDirX > 0) {
    puckStats.puckDirX += .05;
  }

  if (puckStats.puckDirX > -2 && puckStats.puckDirX < 0) {
    puckStats.puckDirX -= .05;
  }

  if (puck.position.y <= bottomEdge){
    let distBetwBott = puck.position.y - bottomEdge;
    puck.position.y += -distBetwBott;
		puckStats.puckDirY = -puckStats.puckDirY;
	}

	if (puck.position.y >= topEdge){
    let distBetwTop = puck.position.y - topEdge;
    puck.position.y += -distBetwTop;
		puckStats.puckDirY = -puckStats.puckDirY;
	}


  //////////////////////////////////////////////////////////////
  ////////////////////// STRIKER BOUNCE ////////////////////////
  ///////////////////// USING COMBO FORM ////////////////////////
  const strikers = [strikerOne, strikerTwo];

  // function rotate(x, y, sin, cos, reverse) {
	// 	return {
	// 			x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
	// 			y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
	// 	};
  // }
  function rotate(x, y, angle) {
		return {
				x: (x * Math.cos(angle) - y * Math.sin(angle)),
				y: (x * Math.sin(angle) + y * Math.cos(angle))
		};
  }

  for (var i= 0; i < strikers.length; i++) {
    let striker = strikers[i];
    var strVelX;
    var strVelY;

    if (i === 0) {
      strVelX = strikerStats.strikerOneDirX;
      strVelY = strikerStats.strikerOneDirY;
    } else {
      strVelX = strikerStats.strikerTwoDirX;
      strVelY = strikerStats.strikerTwoDirY;
    }

    var puckVelX = puckStats.puckDirX,
      puckVelY = puckStats.puckDirY;

    let velXDiff = strVelX - puckVelX,
      velYDiff = strVelY - puckVelY;

    let distX = puck.position.x - striker.position.x,
      distY = puck.position.y - striker.position.y,
      distTotal = Math.sqrt((distX * distX) + (distY * distY)),
      radiusTotal = puckRadius + strikerRadius;

    let m1 = 1,
      m2 = 2;

    if (distTotal < radiusTotal) {
      let distDiff = radiusTotal - distTotal;

      // if (velXDiff * distX - velYDiff * distY >= 0) {
        // debugger;

        var angle = -Math.atan2(distY, distX);
        // sin = Math.sin(angle),
        // cos = Math.cos(angle);

        // velocity before equation
        const u1 = rotate(puckVelX, puckVelY, angle);
        const u2 = rotate(strVelX, strVelY, angle);

        // velocity after 1d collision equation
        const v1 = {
          x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
          y: u1.y
        };
        const v2 = {
          x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
          y: u2.y
        };

        // final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1.x, v1.y, -angle);
        const vFinal2 = rotate(v2.x, v2.y, -angle);

        // swap particle velocities for realistic bounce effect
        puckStats.puckDirX = vFinal1.x;
        puckStats.puckDirY = vFinal1.y;

        // strVelX = vFinal2.x;
        // strVelY = vFinal2.y;


        if (puckStats.puckDirX < 0) {
          puck.position.x += (puckStats.puckDirX - distDiff) ;
        } else {
          puck.position.x += (puckStats.puckDirX + distDiff) ;
        }

        if (puckStats.puckDirX < 0) {
          puck.position.y += (puckStats.puckDirY - distDiff) ;
        } else {
          puck.position.y += (puckStats.puckDirY + distDiff) ;
        }

      }
        puck.position.x += puckStats.puckDirX;
        puck.position.y += puckStats.puckDirY;

  }

  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////
