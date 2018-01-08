[Air Hockey](https://jdoyle5.github.io/Air_Hockey/) - A Classic Arcade Experience With a 3D Spin

## Background and Overview
Air Hockey is an interactive 3D air hockey game combining physics and the classic pong-like visuals with a 3D upgrade. the object of the game is that of any generic air hockey game. Players will use their paddles to try and knock the puck passed the other person's paddle.

Users can play against the A.I. and set different difficulty levels based on their skill level.

Additionally users will be able to set the number of players (up to 4) and number of pucks (up to 2).

## Functionality & MVP
In Air Hockey, users will be able to:
- [ ] Start a new game with 1 to 3 A.I. players and 1 to 2 pucks.
- [ ] Move the paddles back and forth to hit the puck.
- [ ] adjust the size of the paddles and the speed of the puck

This project will also include:
- [ ] An options modal where you can specify the number of players, pucks, puck speed, etc.

## Wireframes
This game will have only a single screen to display the game play. Before the game starts, players can click the options button to bring up the options modal. There, they can can choose from the options specified above.

## Architecture
The following technologies will be used to build this game:
* Vanilla Javascript for the overall game structure and logic
* Three.js and WebGL for DOM manipulation and 3D rendering of the game world
* Webpack for generating static assets representing modules with their dependencies

In addition to the Webpack file, there will be 4 additional script files:
* table.js to handle the 3d rendering of the game world
* movements.js to handle the physics of the puck and the paddles as well as the walls
* items.js to handle the 3d rendering of the puck and the paddles
* game.js to handle the overall game play

## Implementation Timeline
### Over The Weekend:
- [ ] Get Webpack up and running
### Day 1:
- [ ] Finish creating basic html setup for the Game along with the necessary three.js file
- [ ] Develop a good understanding of three.js and webGL for 3d rendering.
- [ ] Add score keeping logic to the backend.
### Day 2:
- [ ] Draw out sphere and paddles
- [ ] Basic setup of game environment using three.js and WebGL for 2 player Game
- [ ] Add basic logic scripts for puck-to-paddle collisions and puck-to-wall collisions
### Day 3:
- [ ] Add basic gameplay logic like resetting the puck to the center of the table after score.
- [ ] Simple A.I. logic for computer player (computer paddle follows the puck at a constant speed)
### Day 4:
- [ ] Basic setup of game environment using three.js and WebGL for 4 players.
- [ ] Add scoreboard ticker and shadows for better viewing experience
### Bonus Features
- [ ] Addition of web-sockets for multiplayer involvement
- [ ] Ability to play in 2D mode
- [ ] Add an options tab where players can set computer player difficulty
