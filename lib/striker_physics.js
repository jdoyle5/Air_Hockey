import * as THREE from 'three';



// document.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
// document.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
//
// var Key = {
//   _pressed: {},
//
//   L: 37,
//   F: 39,
//   R: 38,
//   B: 40,
//   SPACE: 32,
//
//   isDown: function(keyCode) {
//     return this._pressed[keyCode];
//   },
//
//   onKeydown: function(event) {
//     this._pressed[event.keyCode] = true;
//   },
//
//   onKeyup: function(event) {
//     delete this._pressed[event.keyCode];
//   }
// };

// import * as Key from './key_press';
// import * as ENV from './environment';

let strikerTwoDirX = 0, strikerTwoDirY = 0, strikerTwoSpeed = 3;
let strikerOneDirX = 0, strikerOneDirY = 0, strikerOneSpeed = 3;
let difficulty = 0.2;

export function strikerPhysics(puck, strikerOne, strikerTwo, gameStats) {

  strikerTwoDirY = (puck.position.y - strikerTwo.position.y) * difficulty;

  if (Math.abs(strikerTwoDirY) <= strikerTwoSpeed) {
    strikerTwo.position.y += strikerTwoDirY;
  } else if (strikerTwoDirY > strikerTwoSpeed) {
    strikerTwo.position.y += strikerTwoSpeed;
  } else if (strikerTwoDirY < -strikerTwoSpeed) {
    strikerTwo.position.y -= strikerTwoSpeed;
  }

  if (Key.isDown(Key.L)) {
    if (strikerOne.position.y < gameStats.fieldHeight * 0.45) {
      strikerOneDirY = strikerOneSpeed;
    } else {
      strikerOneDirY = 0;
    }
  } else if (Key.isDown(Key.R)) {
    if (strikerOne.position.y > -gameStats.fieldHeight * 0.45) {
      strikerOneDirY = strikerOneSpeed;
    } else {
      strikerOneDirY = 0;
    }
  } else {
    strikerOneDirY = 0;
  }

}
