
import { puckPhysics } from './puck_physics';
import { strikerPhysics } from './striker_physics';



var renderer, scene, camera, pointLight, spotLight;
var puck, strikerOne, strikerTwo;
var strikerTopRadius, strikerBotRadius, strikerTopHeight, strikerBotHeight, strikerDepth, strikerQuality;
let strikerTwoDirX = 0, strikerTwoDirY = 0, strikerTwoSpeed = 3;
let strikerOneDirX = 0, strikerOneDirY = 0, strikerOneSpeed = 3;
let difficulty = 0.2;

const gameStats = {
  scorePlayer1: 0,
  scorePlayer2: 0,
  maxScore: 5,
  fieldWidth: 630,
  fieldHeight: 370
};

const puckStats = {
  puckDirX: 1,
  puckDirY: 1,
  puckSpeed: 3
};

const strikerStats = {
  strikerOneDirX: 0,
  strikerOneDirY: 0,
  strikerTwoDirX: 0,
  strikerTwoDirY: 0,
  strikerOneSpeed: 5,
  strikerTwoSpeed: 5
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function setEnv() {
  document.getElementById("winner").innerHTML =
    "First player to " + gameStats.maxScore + " wins!";

  gameStats.scorePlayer1 = 0;
  gameStats.scorePlayer2 = 0;

  setScene();
  draw();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setScene() {

  const WIDTH = 800, HEIGHT = 500;
  const VIEW_ANGLE = 50,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

  var container = document.getElementById('game-cont');
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
    ASPECT, NEAR, FAR);
  scene = new THREE.Scene();
  scene.add(camera);
  camera.position.z = 220;
  renderer.setSize(WIDTH, HEIGHT);
  container.appendChild(renderer.domElement);

  var strikerOneMaterial =
    new THREE.MeshLambertMaterial({
      color: 0x14cad4
    });

  var strikerTwoMaterial =
    new THREE.MeshLambertMaterial({
      color: 0x14cad4
    });

  var planeMaterial =
    new THREE.MeshLambertMaterial({
      color: 0x7a7a7a
    });

  var tableMaterial =
    new THREE.MeshLambertMaterial({
      color: 0xff0000
    });

  var groundMaterial =
    new THREE.MeshLambertMaterial({
      color: 0xffd700
    });

  var goalMaterial =
    new THREE.MeshLambertMaterial({
      color: 0xD433FF
    });

  var puckMaterial =
    new THREE.MeshLambertMaterial({
      color: 0xD43001
    });



  const tableWidth = 700,
    tableHeight = 400,
    tableQuality = 10;

////////////////////////////////////
  const plane = new THREE.Mesh(
	  new THREE.PlaneGeometry(
		tableWidth * 0.95,
		tableHeight,
		tableQuality,
		tableQuality),
	  planeMaterial
  );

  scene.add(plane);
	plane.receiveShadow = true;
////////////////////////////////////

////////////////////////////////////
  var table = new THREE.Mesh(
    new THREE.CubeGeometry(
    tableWidth * 1.05,
    tableHeight * 1.03,
    100,
    tableQuality,
    tableQuality,
    1),
    tableMaterial
  );

  table.position.z = -51;
  scene.add(table);
  table.receiveShadow = true;
////////////////////////////////////

  var puckRadius = 15,
  height = 3,
  segments = 20;

////////////////////////////////////
  var goalOne = new THREE.Mesh(
    new THREE.CubeGeometry (
      35,
      100,
      10,
      1,
      1,
      1),
      goalMaterial
  );

  scene.add(goalOne);
  goalOne.position.x = gameStats.fieldWidth/2 + 40;
  goalOne.position.z = 10;
////////////////////////////////////

////////////////////////////////////
  var goalTwo = new THREE.Mesh(
    new THREE.CubeGeometry (
      35,
      100,
      10,
      1,
      1,
      1),
      goalMaterial
  );

  scene.add(goalTwo);
  goalTwo.position.x = -gameStats.fieldWidth/2 - 40;
  goalTwo.position.z = 10;
////////////////////////////////////

////////////////////////////////////
  puck = new THREE.Mesh(
    new THREE.CylinderGeometry(
    puckRadius,
    puckRadius,
    height,
    segments),
    puckMaterial
  );

  puck.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );
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
  strikerOne.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );

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
  strikerTwo.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );

  scene.add(strikerTwo);
  strikerTwo.receiveShadow = true;
  strikerTwo.castShadow = true;
////////////////////////////////////////////////////////////////////////

  strikerOne.position.x = -gameStats.fieldWidth/2 + strikerBotRadius - 18;
  strikerTwo.position.x = gameStats.fieldWidth/2 - strikerBotRadius + 18;
  strikerOne.position.z = 3;
  strikerTwo.position.z = 3;

////////////////////////////////////
  pointLight = new THREE.PointLight(0xF8D898);
    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;
    scene.add(pointLight
  );
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

  camera.position.x = strikerOne.position.x - 330;
  camera.position.z = strikerOne.position.z + 280;
  camera.rotation.z = -90 * Math.PI/180;
  camera.rotation.y = -60 * Math.PI/180;
  spotLight.position.x = puck.position.x * 2;
	spotLight.position.y = puck.position.y * 2;

	camera.position.y += (strikerOne.position.y - camera.position.y) * 0.05;

  strikerPhysics(puck, strikerOne, strikerTwo, gameStats, strikerStats);
  puckPhysics(puck, gameStats, strikerOne, strikerTwo, puckStats, strikerStats);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////









////////
