var dirX = 1, dirY = 1, puckSpeed = 2;

function puckPhysics() {
  if (puck.position.x <= -fieldwidth / 2) {
    scorePlayer2++;
    document.getElementById("score").innerHTML = `${scorePlayer1} - ${scorePlayer2}`;

  }
}

function resetPuck(player) {
  puck.position.x = 0;
  puck.position.y = 0;

  if (player === 1) {
    dirX = -1;
  } else {
    dirX = 1
  }
}
