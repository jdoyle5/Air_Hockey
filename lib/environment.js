import * as THREE from 'three';
import { puckPhysics } from './puck_physics';
import { strikerPhysics } from './striker_physics';
window.THREE = THREE;
console.log("working");

// let scorePlayer1 = 0, scorePlayer2 = 0, scorePlayer3 = 0, scorePlayer4 = 0;
var renderer, scene, camera, pointLight, spotLight;
// var maxScore = 5;
var puck, strikerOne, strikerTwo;
var strikerWidth, strikerHeight, strikerDepth, strikerQuality;
// var fieldWidth = 630, fieldHeight = 370;

const gameStats = {
  scorePlayer1: 0,
  scorePlayer2: 0,
  maxScore: 5,
  fieldWidth: 630,
  fieldHeight: 370
};


export function setEnv() {
  document.getElementById("winner").innerHTML =
    "First player to " + gameStats.maxScore + " wins!";

  gameStats.scorePlayer1 = 0;
  gameStats.scorePlayer2 = 0;

  setScene();

  draw();

}

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

  const tableWidth = 700,
    tableHeight = 400,
    tableQuality = 10;

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

  var radiusTop = 15,
  radiusBottom = 15,
  height = 3,
  segments = 20;

  var puckMaterial =
    new THREE.MeshLambertMaterial({
      color: 0xD43001
    });


  puck = new THREE.Mesh(

    new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    segments),

    puckMaterial
  );

  puck.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );

  scene.add(puck);

  puck.position.x = 0;
	puck.position.y = 0;
  puck.position.z = 3;
  puck.receiveShadow = true;
  puck.castShadow = true;

  strikerWidth = 10;
  strikerHeight = 30;
  strikerDepth = 10;

  // strikerOne = new THREE.Mesh(
  //
  //   new THREE.CubeGeometry(
  //     strikerWidth,
  //     strikerHeight,
  //     strikerDepth,
  //     strikerQuality,
  //     strikerQuality,
  //     strikerQuality),
  //
  //   strikerOneMaterial
  // );

  var topCylinder = new THREE.CylinderGeometry(25, 25, 10, 16);
  var strikerOneTop = new THREE.Mesh(topCylinder, strikerOneMaterial);

  var strikerOneMerge = new THREE.CylinderGeometry(8, 8, 50, 16);
  strikerOneTop.updateMatrix();
  strikerOneMerge.merge(strikerOneTop.geometry, strikerOneTop.matrix);

  strikerOne = new THREE.Mesh(strikerOneMerge, strikerOneMaterial);
  strikerOne.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );

  scene.add(strikerOne);
  strikerOne.receiveShadow = true;
  strikerOne.castShadow = true;

  // strikerTwo = new THREE.Mesh(
  //
  //   new THREE.CubeGeometry(
  //     strikerWidth,
  //     strikerHeight,
  //     strikerDepth,
  //     strikerQuality,
  //     strikerQuality,
  //     strikerQuality),
  //
  //   strikerTwoMaterial
  // );

  var strikerTwoTop = new THREE.Mesh(topCylinder, strikerTwoMaterial);

  var strikerTwoMerge = new THREE.CylinderGeometry(8, 8, 50, 16);
  strikerTwoTop.updateMatrix();
  strikerTwoMerge.merge(strikerTwoTop.geometry, strikerTwoTop.matrix);

  strikerTwo = new THREE.Mesh(strikerTwoMerge, strikerTwoMaterial);
  strikerTwo.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );


  scene.add(strikerTwo);
  strikerTwo.receiveShadow = true;
  strikerTwo.castShadow = true;

  strikerOne.position.x = -gameStats.fieldWidth/2 + strikerWidth;
  strikerTwo.position.x = gameStats.fieldWidth/2 - strikerWidth;
  // strikerTwo.position.y = fieldHeight/2 - strikerWidth;
  // strikerOne.position.y = fieldHeight/2 - strikerWidth;
  strikerOne.position.z = 3;
  strikerTwo.position.z = 3;

  pointLight = new THREE.PointLight(0xF8D898);

    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;

    scene.add(pointLight
  );

  spotLight = new THREE.SpotLight(0xF8D898);
  spotLight.position.set(0, 0, 460);
  spotLight.intensity = 1.5;
  spotLight.castShadow = true;
  scene.add(spotLight);


  renderer.shadowMap.enabled = true;
}


function draw() {
	renderer.render(scene, camera);

	requestAnimationFrame(draw);

  camera.position.x = strikerOne.position.x - 330;
  camera.position.z = strikerOne.position.z + 280;
  camera.rotation.z = -90 * Math.PI/180;
  camera.rotation.y = -60 * Math.PI/180;

  puckPhysics(puck, gameStats);

  strikerPhysics(puck, strikerOne, strikerTwo, gameStats);
}
