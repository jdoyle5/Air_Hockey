[Air Hockey](https://jdoyle5.github.io/Air_Hockey/) - A Classic Arcade Experience With a 3D Spin

## Background and Overview
Air Hockey 3D combines collision physics and the classic pong-like visuals with a 3D upgrade. the object of the game is that of any generic air hockey game. Players will use their paddles to try and knock the puck through the other player's goal.


## Functionality
In Air Hockey, users will be able to:
- Use arrow keys to move the paddles backwards, forwards, left, and right.
- Live score updates as players score goals.
- Once the winner is announced, just refresh the game to start a new one.

## Architecture
The following technologies are used to build this game:
* Vanilla Javascript for the overall game structure and logic
* Three.js and WebGL for DOM manipulation and 3D rendering of the game world
* Webpack for generating static assets representing modules with their dependencies

In addition to the Webpack file, there are 4 additional script files:
* environment.js to handle the 3d rendering of the game world, as well as the puck and paddles.
* puck_physics.js to handle the physics of the puck against the walls and the paddles.
* striker_physics.js to handle the physics of the paddle movements when the buttons are pressed.
* key_press.js to handle the striker movements.
