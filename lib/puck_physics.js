

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



        puck.position.x += puckStats.puckDirX;
        puck.position.y += puckStats.puckDirY;




///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
        // var posStr = {
        //   x: 0,
        //   y: 0
        // },
        //
        // posPuck = rotate(distX, distY, sin, cos),
        // velPuck = rotate(puckStats.puckDirX, puckStats.puckDirY, sin, cos),
        // velStr = rotate(strVelX, strVelY, sin, cos),
        // totalVelX = velStr.x - velPuck.x;
        //
        // velStr.x = ((strikerRadius - puckRadius) * velStr.x + 2 * puckRadius * velPuck.x) /
        // (strikerRadius + puckRadius);
        // velPuck.x = totalVelX + velStr.x;
        //
        // //update position so the objects don't stick together
        // var absV = Math.abs(velStr.x) + Math.abs(velPuck.x),
        // overlap = (strikerRadius + puckRadius) - Math.abs(posStr.x - posPuck.x);
        //
        // posStr.x += velStr.x / absV * overlap;
        // posPuck.x += (velPuck.x / absV * overlap);
        //
        // // rotate positions back
        // var posPuckF = rotate(posPuck.x, posPuck.y, sin, cos),
        // posStrF = rotate(posStr.x, posStr.y, sin, cos);

        // set the new positions
        // puck.position.x = striker.position.x + posPuckF.x;
        // puck.position.y = striker.position.y + posPuckF.y;
        // striker.position.x = striker.position.x + posStr.x;
        // striker.position.y = striker.position.y + posStr.y;

        // rotate velocities back
        // var velPuckF = rotate(velPuck.x, velPuck.y, sin, cos),
        // velStrF = rotate(velStr.x, velStr.y, sin, cos);
        //
        // strVelX = velStrF.x;
        // strVelY = velStrF.y;
        //
        // puckStats.puckDirX = velPuckF.x;
        // puckStats.puckDirY = velPuckF.y;
      }

    {
      // puck.position.x += puckStats.puckDirX * puckStats.puckSpeed;
      // puck.position.y += puckStats.puckDirY * puckStats.puckSpeed;
      puck.position.x += puckStats.puckDirX;
      puck.position.y += puckStats.puckDirY;
    }
  }

  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////





  //////////////////////////////////////////////////////////////
  ////////////////////// STRIKER BOUNCE ////////////////////////
  ///////////////////// USING DIST FORM ////////////////////////
  // const dist = function(pos1x, pos2x, pos1y, pos2y) {
  //   return Math.sqrt(
  //     Math.pow(pos1x - pos2x, 2) + Math.pow(pos1y - pos2y, 2)
  //   );
  // };
  //
  // let distPuckStrOne = dist(strikerOne.position.x, puck.position.x,
  //   strikerOne.position.y, puck.position.y);
  //
  // let distPuckStrTwo = dist(strikerTwo.position.x, puck.position.x,
  //   strikerTwo.position.y, puck.position.y);
  //
  //
  //
  // if (distPuckStrOne <= (strikerBotRadius + puckRadius)) {
  //   // If the striker's speed is greater than that of the puck's, we
  //   // want to move the puck out from under the striker so it doesn't
  //   // get stuck.
  //   if (puckStats.puckDirX < 0) {
  //     if (Math.abs(strikerStats.strikerOneDirX) > Math.abs(puckStats.puckDirX)) {
  //       // while (distPuckStrOne < (strikerBotRadius + puckRadius)) {
  //         puck.position.x += ((strikerBotRadius + puckRadius * 1.4) - distPuckStrOne);
  //       // }
  //     }
  //   } else if (puckStats.puckDirX > 0) {
  //     if (Math.abs(strikerStats.strikerOneDirX) > Math.abs(puckStats.puckDirX)) {
  //       // while (distPuckStrOne < (strikerBotRadius + puckRadius)) {
  //         puck.position.x -= ((strikerBotRadius + puckRadius * 1.4) - distPuckStrOne);
  //       // }
  //     }
  //   }
  //
  //   if (puckStats.puckDirY < 0) {
  //     if (Math.abs(strikerStats.strikerOneDirY) > Math.abs(puckStats.puckDirY)) {
  //       // while (distPuckStrOne < (strikerBotRadius + puckRadius)) {
  //         puck.position.y += ((strikerBotRadius + puckRadius * 1.4) - distPuckStrOne);
  //       // }
  //     }
  //   } else if (puckStats.puckDirY > 0) {
  //     if (Math.abs(strikerStats.strikerOneDirY) > Math.abs(puckStats.puckDirY)) {
  //       // while (distPuckStrOne < (strikerBotRadius + puckRadius)) {
  //         puck.position.y -= ((strikerBotRadius + puckRadius * 1.4) - distPuckStrOne);
  //       // }
  //     }
  //   }
  //
  //   puckStats.puckDirX = -puckStats.puckDirX + (strikerStats.strikerOneDirX * puckSpeedLev);
  //   puckStats.puckDirY = -puckStats.puckDirY + (strikerStats.strikerOneDirY * puckSpeedLev);
  // }
  //
  // if (distPuckStrTwo <= (strikerBotRadius + puckRadius)) {
  //
  //   // If the striker's speed is greater than that of the puck's, we
  //   // want to move the puck out from under the striker so it doesn't
  //   // get stuck.
  //   if (puckStats.puckDirX < 0) {
  //     if (Math.abs(strikerStats.strikerTwoDirX) > Math.abs(puckStats.puckDirX)) {
  //       // while (distPuckStrTwo < (strikerBotRadius + puckRadius)) {
  //         puck.position.x += ((strikerBotRadius + puckRadius * 1.3) - distPuckStrTwo);
  //       // }
  //     }
  //   } else if (puckStats.puckDirX > 0) {
  //     if (Math.abs(strikerStats.strikerTwoDirX) > Math.abs(puckStats.puckDirX)) {
  //       // while (distPuckStrTwo < (strikerBotRadius + puckRadius)) {
  //         puck.position.x -= ((strikerBotRadius + puckRadius * 1.3) - distPuckStrTwo);
  //       // }
  //     }
  //   }
  //
  //   if (puckStats.puckDirY < 0) {
  //     if (Math.abs(strikerStats.strikerTwoDirY) > Math.abs(puckStats.puckDirY)) {
  //       // while (distPuckStrTwo < (strikerBotRadius + puckRadius)) {
  //         puck.position.y += ((strikerBotRadius + puckRadius * 1.3) - distPuckStrTwo);
  //       // }
  //     }
  //   } else if (puckStats.puckDirY > 0) {
  //     if (Math.abs(strikerStats.strikerTwoDirY) > Math.abs(puckStats.puckDirY)) {
  //       // while (distPuckStrTwo < (strikerBotRadius + puckRadius)) {
  //         puck.position.y -= ((strikerBotRadius + puckRadius * 1.3) - distPuckStrTwo);
  //       // }
  //     }
  //   }
  //
  //     puckStats.puckDirX = -puckStats.puckDirX - (strikerStats.strikerTwoDirX * puckSpeedLev);
  //     puckStats.puckDirY = -puckStats.puckDirY - (strikerStats.strikerTwoDirY * puckSpeedLev);
  // }
  //
  // //////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////
  //
  // if (puckStats.puckDirY > puckStats.puckSpeed * 2) {
  //   puckStats.puckDirY = puckStats.puckSpeed * 2;
  // }
  // else if (puckStats.puckDirY < -puckStats.puckSpeed * 2) {
  //   puckStats.puckDirY = -puckStats.puckSpeed * 2;
  // }



  // checkCollision(puck, strikerOne, puckStats, strikerStats);
  // checkCollision(puck, strikerTwo, puckStats, strikerStats);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


// function rotate (x, y, sin, cos, reverse) {
//   return {
//     x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
//     y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
//   };
// }
//
// function checkCollision (puck, striker, puckStats, strikerStats) {
//   var puckVX = puckStats.puckDirX,
//     puckVY = puckStats.puckDirY,
//     strVX = strikerStats.strikerOneDirX,
//     strVY = strikerStats.strikerOneDirY,
//     puckMass = puckRadius,
//     strMass = strikerBotRadius;
//
//   var dx = puck.position.x - striker.position.x,
//     dy = puck.position.y - striker.position.y,
//     dist = Math.sqrt(dx * dx + dy * dy);
//
//   if (dist < puckRadius + strikerBotRadius) {
//     var angle = Math.atan2(dy, dx),
//       sin = Math.sin(angle),
//       cos = Math.cos(angle),
//       // rotate the striker's position
//       strPos = {x: 0, y: 0},
//       // rotate the puck's position
//       puckPos = rotate(dx, dy, sin, cos, true),
//       // rotate the striker's velocity
//       strVel = rotate(strVX, strVY, sin, cos, true),
//       // rotate puck's velocity
//       puckVel = rotate(puckVX, puckVY, sin, cos, true),
//       // collision reaction
//       vXTotal = strVel.x - puckVel.x;
//       strVel.x = ((strMass - puckMass) * strVel.x + 2 * puckMass * puckVel.x) /
//         (strMass + puckMass);
//       puckVel.x = vXTotal + strVel.x;
//       // update position to avoid objects sticking
//       var absV = Math.abs(strVel.x) + Math.abs(puckVel.x),
//         overlap = (puckRadius + strikerBotRadius) -
//           Math.abs(strPos.x - puckPos.x);
//       strPos.x += strVel.x / absV * overlap;
//       puckPos.x += puckVel.x / absV * overlap;
//
//       // rotate positions back
//       var strPosF = rotate(strPos.x, strPos.y, sin, cos, false);
//       var puckPosF = rotate(puckPos.x, puckPos.y, sin, cos, false);
//
//       //Adjust puck position
//       puck.position.x = striker.position.x + puckPos.x;
//       puck.position.y = striker.position.y + puckPos.y;
//       striker.position.x = striker.position.x + strPosF.x;
//       striker.position.y = striker.position.y + strPosF.y;
//
//       //rotate velocities back
//       var strVelF = rotate(strVel.x, strVel.y, sin, cos, false);
//       var puckVelF = rotate(puckVel.x, puckVel.y, sin, cos, false);
//       strVX = strVelF.x;
//       strVY = strVelF.y;
//       puckVX = puckVelF.x;
//       puckVY - puckVelF.y;
//     } else {
//     puck.position.x += puckStats.puckDirX * puckStats.puckSpeed;
//     puck.position.y += puckStats.puckDirY * puckStats.puckSpeed;
//   }












/////
