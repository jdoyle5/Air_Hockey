


export function strikerPhysics(puck, strikerOne, strikerTwo, gameStats, strikerStats) {

  let difficulty = gameStats.difficulty;

  let robotEdgeTwo = gameStats.fieldWidth/2 - 40;
  let robotEdgeOne = -gameStats.fieldWidth/2 + 40;

  strikerStats.strikerTwoDirY = (puck.position.y - strikerTwo.position.y) * difficulty;

  if (puck.position.x > 0) {
    strikerStats.strikerTwoDirX = (puck.position.x - strikerTwo.position.x) * .05;
  }

  if (Math.abs(strikerStats.strikerTwoDirY) <= strikerStats.strikerTwoSpeed) {
    strikerTwo.position.y += strikerStats.strikerTwoDirY;
  } else if (strikerStats.strikerTwoDirY > strikerStats.strikerTwoSpeed) {
    strikerTwo.position.y += strikerStats.strikerTwoSpeed;
  } else if (strikerStats.strikerTwoDirY < -strikerStats.strikerTwoSpeed) {
    strikerTwo.position.y -= strikerStats.strikerTwoSpeed;
  }

  if (puck.position.x > 0 && strikerTwo.position.x > 0) {
    strikerTwo.position.x += (strikerStats.strikerTwoDirX * (.15 * 2));
  } else if (strikerTwo.position.x <= robotEdgeTwo) {
    strikerTwo.position.x += 2;
  }





  if (gameStats.gameOnBool) {
    if (Key.isDown(Key.L)) {
      if (strikerOne.position.y < gameStats.fieldHeight * 0.47) {
        strikerStats.strikerOneDirY = strikerStats.strikerOneSpeed;
      } else {
        strikerStats.strikerOneDirY = 0;
      }
    } else if (Key.isDown(Key.R)) {
      if (strikerOne.position.y > -gameStats.fieldHeight *0.47) {
        strikerStats.strikerOneDirY = -strikerStats.strikerOneSpeed;
      } else {
        strikerStats.strikerOneDirY = 0;
      }
    } else {
      strikerStats.strikerOneDirY = 0;
    }


    if (Key.isDown(Key.F)) {
      if (strikerOne.position.x < -50) {
        strikerStats.strikerOneDirX = strikerStats.strikerOneSpeed;
      } else {
        strikerStats.strikerOneDirX = 0;
      }
    } else if (Key.isDown(Key.B)) {
      if (strikerOne.position.x > -307) {
        strikerStats.strikerOneDirX = -strikerStats.strikerOneSpeed;
      } else {
        strikerStats.strikerOneDirX = 0;
      }
    } else {
      strikerStats.strikerOneDirX = 0;
    }
  } else {

    strikerStats.strikerOneDirY = (puck.position.y - strikerOne.position.y) * difficulty;

    if (puck.position.x < 0) {
      strikerStats.strikerOneDirX = (puck.position.x - strikerOne.position.x) * .02;
    }

    if (Math.abs(strikerStats.strikerOneDirY) <= strikerStats.strikerOneSpeed) {
      strikerOne.position.y += strikerStats.strikerOneDirY;
    } else if (strikerStats.strikerOneDirY > strikerStats.strikerOneSpeed) {
      strikerOne.position.y += strikerStats.strikerOneSpeed;
    } else if (strikerStats.strikerOneDirY < -strikerStats.strikerOneSpeed) {
      strikerOne.position.y -= strikerStats.strikerOneSpeed;
    }

    if (puck.position.x < -30) {
      strikerOne.position.x += (strikerStats.strikerOneDirX * (difficulty * 2));
    } else if (strikerOne.position.x >= robotEdgeOne) {
      strikerOne.position.x -= 5;
    } else if (strikerOne.position.x <= robotEdgeOne - 80) {
      strikerOne.position.x = robotEdgeOne + 10;
    }
  }




  strikerOne.position.y += strikerStats.strikerOneDirY;
  strikerOne.position.x += strikerStats.strikerOneDirX;

  }
