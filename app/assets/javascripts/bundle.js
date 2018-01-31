/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _environment = __webpack_require__(1);

var ENV = _interopRequireWildcard(_environment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

document.addEventListener("DOMContentLoaded", function () {
  ENV.setEnv();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEnv = setEnv;

var _puck_physics = __webpack_require__(2);

var _striker_physics = __webpack_require__(3);

var renderer, scene, camera, pointLight, spotLight;
var puck, strikerOne, strikerTwo;
var strikerTopRadius, strikerBotRadius, strikerTopHeight, strikerBotHeight, strikerDepth, strikerQuality;
var strikerTwoDirX = 0,
    strikerTwoDirY = 0,
    strikerTwoSpeed = 3;
var strikerOneDirX = 0,
    strikerOneDirY = 0,
    strikerOneSpeed = 3;
var difficulty = 0.2;

var gameStats = {
  scorePlayer1: 0,
  scorePlayer2: 0,
  maxScore: 5,
  fieldWidth: 630,
  fieldHeight: 370,
  gameOnBool: false
};

var puckStats = {
  puckDirX: 2,
  puckDirY: 2
  // puckSpeed: 2
};

var strikerStats = {
  strikerOneDirX: 1,
  strikerOneDirY: 0,
  strikerTwoDirX: 1,
  strikerTwoDirY: 0,
  strikerOneSpeed: 5,
  strikerTwoSpeed: 5
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setEnv() {

  document.getElementById("play-button").onclick = function () {
    newGame();
  };

  document.getElementById("score-board").innerHTML = 'Select new game to begin!';

  setScene();
  draw();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function newGame() {
  document.getElementById("play-button").classList.add("hide");

  gameStats.gameOnBool = true;

  gameStats.scorePlayer1 = 0;
  gameStats.scorePlayer2 = 0;

  (0, _puck_physics.resetPuck)(1, puck, puckStats);

  strikerOne.position.x = -gameStats.fieldWidth / 2 + strikerBotRadius - 15;
  strikerOne.position.z = 3;
  strikerOne.position.y = 0;
  document.getElementById("score-board").innerHTML = gameStats.scorePlayer1 + ' - ' + gameStats.scorePlayer2;
  document.getElementById("score-board").classList.remove("blink-me");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setScene() {

  var WIDTH = 800,
      HEIGHT = 500;
  var VIEW_ANGLE = 50,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;

  var container = document.getElementById('game-cont');
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene = new THREE.Scene();
  scene.add(camera);
  camera.position.z = 220;
  renderer.setSize(WIDTH, HEIGHT);
  container.appendChild(renderer.domElement);

  var strikerOneMaterial = new THREE.MeshLambertMaterial({
    color: 0x4B0082
  });

  var strikerTwoMaterial = new THREE.MeshLambertMaterial({
    color: 0x4B0082
  });

  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x000000
  });

  var tableMaterial = new THREE.MeshLambertMaterial({
    color: 0x228B22
  });

  var groundMaterial = new THREE.MeshLambertMaterial({
    color: 0xffd700
  });

  var goalOneMaterial = new THREE.MeshLambertMaterial({
    color: 0x0000FF
  });

  var goalTwoMaterial = new THREE.MeshLambertMaterial({
    color: 0x0000FF
  });

  var puckMaterial = new THREE.MeshLambertMaterial({
    color: 0xD43001
  });

  var tableWidth = 700,
      tableHeight = 400,
      tableQuality = 10;

  ////////////////////////////////////
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(tableWidth * 0.95, tableHeight, tableQuality, tableQuality), planeMaterial);

  scene.add(plane);
  plane.receiveShadow = true;
  ////////////////////////////////////

  ////////////////////////////////////
  var table = new THREE.Mesh(new THREE.CubeGeometry(tableWidth * 1.05, tableHeight * 1.03, 100, tableQuality, tableQuality, 1), tableMaterial);

  table.position.z = -51;
  scene.add(table);
  table.receiveShadow = true;
  ////////////////////////////////////

  var puckRadius = 15,
      height = 3,
      segments = 20;

  ////////////////////////////////////
  var goalOne = new THREE.Mesh(new THREE.CubeGeometry(35, 100, 10, 1, 1, 1), goalOneMaterial);

  scene.add(goalOne);
  goalOne.position.x = gameStats.fieldWidth / 2 + 20;
  goalOne.position.z = 10;
  ////////////////////////////////////

  ////////////////////////////////////
  var goalTwo = new THREE.Mesh(new THREE.CubeGeometry(35, 100, 10, 1, 1, 1), goalTwoMaterial);

  scene.add(goalTwo);
  goalTwo.position.x = -gameStats.fieldWidth / 2 - 32;
  goalTwo.position.z = 10;
  ////////////////////////////////////

  ////////////////////////////////////
  puck = new THREE.Mesh(new THREE.CylinderGeometry(puckRadius, puckRadius, height, segments), puckMaterial);

  puck.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));
  scene.add(puck);
  ////////////////////////////////////

  puck.position.x = 0;
  puck.position.y = 0;
  puck.position.z = 3;
  puck.receiveShadow = true;
  puck.castShadow = true;

  strikerBotRadius = 25;
  strikerTopRadius = 8;
  strikerTopHeight = 50;
  strikerBotHeight = 10;
  strikerDepth = 10;

  ////////////////////////////////////////////////////////////////////////
  var topCylinder = new THREE.CylinderGeometry(strikerBotRadius, strikerBotRadius, strikerBotHeight, 16);
  var strikerOneTop = new THREE.Mesh(topCylinder, strikerOneMaterial);

  var strikerOneMerge = new THREE.CylinderGeometry(strikerTopRadius, strikerTopRadius, strikerTopHeight, 16);
  strikerOneTop.updateMatrix();
  strikerOneMerge.merge(strikerOneTop.geometry, strikerOneTop.matrix);

  strikerOne = new THREE.Mesh(strikerOneMerge, strikerOneMaterial);
  strikerOne.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));

  scene.add(strikerOne);
  strikerOne.receiveShadow = true;
  strikerOne.castShadow = true;
  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  var strikerTwoTop = new THREE.Mesh(topCylinder, strikerTwoMaterial);

  var strikerTwoMerge = new THREE.CylinderGeometry(8, 8, 50, 16);
  strikerTwoTop.updateMatrix();
  strikerTwoMerge.merge(strikerTwoTop.geometry, strikerTwoTop.matrix);

  strikerTwo = new THREE.Mesh(strikerTwoMerge, strikerTwoMaterial);
  strikerTwo.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));

  scene.add(strikerTwo);
  strikerTwo.receiveShadow = true;
  strikerTwo.castShadow = true;
  ////////////////////////////////////////////////////////////////////////

  strikerOne.position.x = -gameStats.fieldWidth / 2 + strikerBotRadius - 15;
  strikerTwo.position.x = gameStats.fieldWidth / 2 - strikerBotRadius + 15;
  strikerOne.position.z = 3;
  strikerTwo.position.z = 3;

  ////////////////////////////////////
  pointLight = new THREE.PointLight(0xF8D898);
  pointLight.position.x = -1000;
  pointLight.position.y = 0;
  pointLight.position.z = 1000;
  pointLight.intensity = 2.9;
  pointLight.distance = 10000;
  scene.add(pointLight);
  ////////////////////////////////////

  ////////////////////////////////////
  spotLight = new THREE.SpotLight(0xF8D898);
  spotLight.position.set(0, 0, 460);
  spotLight.intensity = 1.5;
  spotLight.castShadow = true;
  scene.add(spotLight);
  renderer.shadowMap.enabled = true;
  ////////////////////////////////////
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function draw() {
  renderer.render(scene, camera);
  requestAnimationFrame(draw);

  // camera.position.x = 0;
  // camera.position.z = 600;
  camera.position.x = -700;
  camera.position.z = strikerOne.position.z + 350;
  camera.rotation.z = -90 * Math.PI / 180;
  camera.rotation.y = -60 * Math.PI / 180;
  spotLight.position.x = puck.position.x * 2;
  spotLight.position.y = puck.position.y * 2;

  // camera.position.y += (strikerOne.position.y - camera.position.y) * 0.05;

  (0, _striker_physics.strikerPhysics)(puck, strikerOne, strikerTwo, gameStats, strikerStats);
  (0, _puck_physics.puckPhysics)(puck, gameStats, strikerOne, strikerTwo, puckStats, strikerStats);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.puckPhysics = puckPhysics;
exports.resetPuck = resetPuck;


var puckRadius = 15;
var strikerRadius = 25;
var puckSpeedLev = 0.1;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function puckPhysics(puck, gameStats, strikerOne, strikerTwo, puckStats, strikerStats) {

  var bottomEdge = -gameStats.fieldHeight / 2;
  var topEdge = gameStats.fieldHeight / 2;
  var leftEdge = -gameStats.fieldWidth / 2;
  var rightEdge = gameStats.fieldWidth / 2;

  if (puck.position.x <= -gameStats.fieldWidth / 2 && puck.position.y > -50 && puck.position.y < 50) {
    if (gameStats.gameOnBool) {
      gameStats.scorePlayer2++;
      document.getElementById("score-board").innerHTML = gameStats.scorePlayer1 + " - " + gameStats.scorePlayer2;
      gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats, gameStats);
    }
    resetPuck(2, puck, puckStats);
  } else if (puck.position.x <= -gameStats.fieldWidth / 2) {
    var distBetwLeft = puck.position.x - leftEdge;
    puck.position.x += -distBetwLeft;
    puckStats.puckDirX = -puckStats.puckDirX;
  }

  if (puck.position.x >= gameStats.fieldWidth / 2 && puck.position.y > -50 && puck.position.y < 50) {
    if (gameStats.gameOnBool) {
      gameStats.scorePlayer1++;
      document.getElementById("score-board").innerHTML = gameStats.scorePlayer1 + " - " + gameStats.scorePlayer2;
      gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats, gameStats);
    }
    resetPuck(2, puck, puckStats);
  } else if (puck.position.x >= gameStats.fieldWidth / 2) {
    var distBetwRight = puck.position.x - rightEdge;
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

  if (puck.position.y <= bottomEdge) {
    var distBetwBott = puck.position.y - bottomEdge;
    puck.position.y += -distBetwBott;
    puckStats.puckDirY = -puckStats.puckDirY;
  }

  if (puck.position.y >= topEdge) {
    var distBetwTop = puck.position.y - topEdge;
    puck.position.y += -distBetwTop;
    puckStats.puckDirY = -puckStats.puckDirY;
  }

  //////////////////////////////////////////////////////////////
  ////////////////////// STRIKER BOUNCE ////////////////////////
  ///////////////////// USING COMBO FORM ////////////////////////
  var strikers = [strikerOne, strikerTwo];

  // function rotate(x, y, sin, cos, reverse) {
  // 	return {
  // 			x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
  // 			y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
  // 	};
  // }
  function rotate(x, y, angle) {
    return {
      x: x * Math.cos(angle) - y * Math.sin(angle),
      y: x * Math.sin(angle) + y * Math.cos(angle)
    };
  }

  for (var i = 0; i < strikers.length; i++) {
    var striker = strikers[i];
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

    var velXDiff = strVelX - puckVelX,
        velYDiff = strVelY - puckVelY;

    var distX = puck.position.x - striker.position.x,
        distY = puck.position.y - striker.position.y,
        distTotal = Math.sqrt(distX * distX + distY * distY),
        radiusTotal = puckRadius + strikerRadius;

    var m1 = 1,
        m2 = 2;

    if (distTotal < radiusTotal) {
      var distDiff = radiusTotal - distTotal;

      // if (velXDiff * distX - velYDiff * distY >= 0) {
      // debugger;

      var angle = -Math.atan2(distY, distX);
      // sin = Math.sin(angle),
      // cos = Math.cos(angle);

      // velocity before equation
      var u1 = rotate(puckVelX, puckVelY, angle);
      var u2 = rotate(strVelX, strVelY, angle);

      // velocity after 1d collision equation
      var v1 = {
        x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
        y: u1.y
      };
      var v2 = {
        x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
        y: u2.y
      };

      // final velocity after rotating axis back to original location
      var vFinal1 = rotate(v1.x, v1.y, -angle);
      var vFinal2 = rotate(v2.x, v2.y, -angle);

      // swap particle velocities for realistic bounce effect
      puckStats.puckDirX = vFinal1.x;
      puckStats.puckDirY = vFinal1.y;

      // strVelX = vFinal2.x;
      // strVelY = vFinal2.y;


      if (puckStats.puckDirX < 0) {
        puck.position.x += puckStats.puckDirX - distDiff;
      } else {
        puck.position.x += puckStats.puckDirX + distDiff;
      }

      if (puckStats.puckDirX < 0) {
        puck.position.y += puckStats.puckDirY - distDiff;
      } else {
        puck.position.y += puckStats.puckDirY + distDiff;
      }
    }
    puck.position.x += puckStats.puckDirX;
    puck.position.y += puckStats.puckDirY;
  }
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
function gameWonCheck(scorePlayer1, scorePlayer2, maxScore, puckStats, gameStats) {
  if (scorePlayer1 >= maxScore) {
    puckStats.puckSpeed = 0;
    document.getElementById("score-board").innerHTML = "Human Wins!";
    document.getElementById("play-button").classList.remove("hide");
    gameStats.gameOnBool = false;
  } else if (scorePlayer2 >= maxScore) {
    puckStats.puckSpeed = 0;
    document.getElementById("score-board").innerHTML = "Robot Wins!";
    document.getElementById("play-button").classList.remove("hide");
    gameStats.gameOnBool = false;
  }
}
///////////////////////////////////////////////////////////////////////////////////////

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strikerPhysics = strikerPhysics;


var difficulty = .15;

function strikerPhysics(puck, strikerOne, strikerTwo, gameStats, strikerStats) {

  var robotEdgeTwo = gameStats.fieldWidth / 2 - 40;
  var robotEdgeOne = -gameStats.fieldWidth / 2 + 40;

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
    strikerTwo.position.x += strikerStats.strikerTwoDirX * (difficulty * 2);
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
      if (strikerOne.position.y > -gameStats.fieldHeight * 0.47) {
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
      strikerOne.position.x += strikerStats.strikerOneDirX * (difficulty * 2);
    } else if (strikerOne.position.x >= robotEdgeOne) {
      strikerOne.position.x -= 5;
    } else if (strikerOne.position.x <= robotEdgeOne - 80) {
      strikerOne.position.x = robotEdgeOne + 10;
    }
  }

  strikerOne.position.y += strikerStats.strikerOneDirY;
  strikerOne.position.x += strikerStats.strikerOneDirX;
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map