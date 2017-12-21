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
  fieldHeight: 370
};

var puckStats = {
  puckDirX: 2,
  puckDirY: 2
  // puckSpeed: 2
};

var strikerStats = {
  strikerOneDirX: 0,
  strikerOneDirY: 0,
  strikerTwoDirX: 0,
  strikerTwoDirY: 0,
  strikerOneSpeed: 5,
  strikerTwoSpeed: 5
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setEnv() {
  document.getElementById("winner").innerHTML = "First player to " + gameStats.maxScore + " wins!";

  gameStats.scorePlayer1 = 0;
  gameStats.scorePlayer2 = 0;

  setScene();
  draw();
}
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
    color: 0x14cad4
  });

  var strikerTwoMaterial = new THREE.MeshLambertMaterial({
    color: 0x14cad4
  });

  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x7a7a7a
  });

  var tableMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000
  });

  var groundMaterial = new THREE.MeshLambertMaterial({
    color: 0xffd700
  });

  var goalMaterial = new THREE.MeshLambertMaterial({
    color: 0xD433FF
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
  var goalOne = new THREE.Mesh(new THREE.CubeGeometry(35, 100, 10, 1, 1, 1), goalMaterial);

  scene.add(goalOne);
  goalOne.position.x = gameStats.fieldWidth / 2 + 32;
  goalOne.position.z = 10;
  ////////////////////////////////////

  ////////////////////////////////////
  var goalTwo = new THREE.Mesh(new THREE.CubeGeometry(35, 100, 10, 1, 1, 1), goalMaterial);

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

  camera.position.x = 0;
  camera.position.z = 600;
  // camera.position.x = strikerOne.position.x - 330;
  // camera.position.z = strikerOne.position.z + 280;
  // camera.rotation.z = -90 * Math.PI/180;
  // camera.rotation.y = -60 * Math.PI/180;
  spotLight.position.x = puck.position.x * 2;
  spotLight.position.y = puck.position.y * 2;

  camera.position.y += (strikerOne.position.y - camera.position.y) * 0.05;

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


var puckRadius = 15;
var strikerRadius = 25;
var puckSpeedLev = 0.3;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function puckPhysics(puck, gameStats, strikerOne, strikerTwo, puckStats, strikerStats) {
  if (puck.position.x <= -gameStats.fieldWidth / 2 && puck.position.y > -50 && puck.position.y < 50) {
    gameStats.scorePlayer2++;
    document.getElementById("score-board").innerHTML = gameStats.scorePlayer1 + " - " + gameStats.scorePlayer2;
    resetPuck(2, puck, puckStats);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats);
  } else if (puck.position.x <= -gameStats.fieldWidth / 2) {
    puckStats.puckDirX = -puckStats.puckDirX;
  }

  if (puck.position.x >= gameStats.fieldWidth / 2 && puck.position.y > -50 && puck.position.y < 50) {
    gameStats.scorePlayer1++;
    document.getElementById("score-board").innerHTML = gameStats.scorePlayer1 + " - " + gameStats.scorePlayer2;
    resetPuck(1, puck, puckStats);
    gameWonCheck(gameStats.scorePlayer1, gameStats.scorePlayer2, gameStats.maxScore, puckStats);
  } else if (puck.position.x >= gameStats.fieldWidth / 2) {
    puckStats.puckDirX = -puckStats.puckDirX;
  }

  if (puckStats.puckDirY > 2) {
    puckStats.puckDirY -= .05;
  }

  if (puckStats.puckDirY < -2) {
    puckStats.puckDirY += .05;
  }

  if (puck.position.y <= -gameStats.fieldHeight / 2) {
    puckStats.puckDirY = -puckStats.puckDirY;
  }

  if (puck.position.y >= gameStats.fieldHeight / 2) {
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
      // debugger;

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strikerPhysics = strikerPhysics;


var difficulty = .3;

function strikerPhysics(puck, strikerOne, strikerTwo, gameStats, strikerStats) {

  strikerStats.strikerTwoDirY = (puck.position.y - strikerTwo.position.y) * difficulty;

  if (Math.abs(strikerStats.strikerTwoDirY) <= strikerStats.strikerTwoSpeed) {
    strikerTwo.position.y += strikerStats.strikerTwoDirY;
  } else if (strikerStats.strikerTwoDirY > strikerStats.strikerTwoSpeed) {
    strikerTwo.position.y += strikerStats.strikerTwoSpeed;
  } else if (strikerStats.strikerTwoDirY < -strikerStats.strikerTwoSpeed) {
    strikerTwo.position.y -= strikerStats.strikerTwoSpeed;
  }

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

  strikerOne.position.y += strikerStats.strikerOneDirY;
  strikerOne.position.x += strikerStats.strikerOneDirX;
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map