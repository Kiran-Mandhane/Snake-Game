let typeGame = +window.prompt("If you want to play a one-player game, press 1. If you want to play a two player game, press 2.")
let colors = ["green", "blue"]
let fruit = []
let antennaOrient = []
let smileyOrient = [];
let soundOver;
let soundEat;
let chosenFruit;


function preload() {
soundOver = loadSound("images/kick.wav");
soundEat = loadSound("images/biteApple.mp3")
smileyOrient = [loadImage("images/smileyup.png"), loadImage("images/smileydown.png"), loadImage("images/smileyright.png"), loadImage("images/smileyleft.png")]
antennaOrient = [loadImage("images/antennaUp.png"), loadImage("images/antennaDown.png"), loadImage("images/antennaRight.png"), loadImage("images/antennaLeft.png") ]
fruit = [loadImage("images/apple.png"), loadImage("images/orange.png"), loadImage("images/leaf.png")]
}



class Tail {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
  }
}

class Antenna {
  constructor(x, y, xspeed, yspeed, orientation, smiley) {
    this.orientation = orientation;
    this.smiley = smiley;
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
}

let grid = 25;
let fruitX = 7
let fruitY = 7
let snakes = [];
let antenna = [];
let img;
let score = 0;
// chosenFruit = fruit[0];
// console.log(fruit[0]);



function setup() {
	let sketch = createCanvas(625, 625);
    sketch.parent("mycanvas");

  
  for (let i = 0; i < typeGame; i++) {
  snakes.push ({
      tail: [],
      newCol: false,
      col: "green"
    })
  }


  for (let i = 0; i < typeGame; i++) {
  antenna.push(new Antenna((i*3)* grid, (i*3) * grid, 0, 0, antennaOrient[0], smileyOrient[0]))
  

  snakes[i].tail.push(new Tail((i*2)* grid, (i*3) * grid, colors[i]))
  }

  chosenFruit = fruit[0];
  
  frameRate(8);
}//end setup



function draw() {
  background(100,92,80);
  for (let numSnakes = 0; numSnakes < snakes.length; numSnakes++) {
  drawTail(numSnakes)
  checkWallCollision(numSnakes);
  checkSnakeCollision(numSnakes);
  checkFruitCollision(numSnakes);

    
  if (snakes.length> 1) {
    twoSnakeCollison();
  }


  drawFruit(numSnakes);
  fill("white")
  textSize(16)
  }

  frameRate(8)
  
}//end draw

  function drawTail(n) {
    let allCols = [];
    let allLocsX = [];
    let allLocsY = [];

    
    for (let i = 0; i < snakes[n].tail.length; i++) {
      allLocsX.push(snakes[n].tail[i].x)
      allLocsY.push(snakes[n].tail[i].y)     
    }

    for(let i = 1; i < snakes[n].tail.length; i++) {
      allCols.push(snakes[n].tail[i].col) //colors of all tails are put into array 
    }

    snakes[n].tail[0].x = antenna[n].x;
    snakes[n].tail[0].y = antenna[n].y;

      antenna[n].x += antenna[n].xspeed * grid
      antenna[n].y += antenna[n].yspeed * grid
    
    for (let i = 1; i < snakes[n].tail.length; i++) {
        snakes[n].tail[i].col = allCols[i-1];
        snakes[n].tail[i].x = allLocsX[i-1];
        snakes[n].tail[i].y = allLocsY[i-1];
      }


    
      for (let i = 0; i < snakes[n].tail.length; i++) {
        fill(snakes[n].tail[i].col);
        circle(snakes[n].tail[i].x + grid/2, snakes[n].tail[i].y + grid/2, grid)
        image(antenna[n].orientation, antenna[n].x, antenna[n].y, 25, 25)
        image(antenna[n].smiley, snakes[n].tail[0].x, snakes[n].tail[0].y, 25, 25)
        //draws the tail every time in a new spot 
      }
  } 

function checkFruitCollision(n) {
    if (fruitX*grid === antenna[n].x && fruitY*grid === antenna[n].y) {
      let col = "red";
      soundEat.play();
          if (chosenFruit === fruit[0]) {col = "red"}
          if (chosenFruit === fruit[1]) {col= "orange"}
          if (chosenFruit === fruit[2]) {col= color(105, 232, 86)}
      fruitX = floor(random(0, grid))
      fruitY = floor(random(0, grid))
      chosenFruit = random(fruit)
      newCol = true;
      snakes[n].tail.push(new Tail(antenna[n].x, antenna[n].y, col)) 
      newCol = false;
      score++;
}

    if (typeGame === 1) {
        fill("white")
        text("score: " + score, 550, 20)
      }

}

  function drawFruit() {
    image(chosenFruit, fruitX * grid, fruitY * grid, 25, 25)
  }


function keyPressed() {
if (keyCode===UP_ARROW) {
  if (antenna[0].yspeed === 1) {
    return;
  }
  antenna[0].yspeed = -1;
  antenna[0].xspeed = 0;
  antenna[0].orientation = antennaOrient[0];
  antenna[0].smiley = smileyOrient[0];
} 

if (keyCode===DOWN_ARROW) {
  if (antenna[0].yspeed === -1) {
    return;
  }
  antenna[0].yspeed = 1;
  antenna[0].xspeed = 0;
  antenna[0].orientation = antennaOrient[1];
  antenna[0].smiley = smileyOrient[1];
} 

if (keyCode===LEFT_ARROW) {
  if (antenna[0].xspeed === 1) {
    return;
  }
  antenna[0].yspeed = 0;
  antenna[0].xspeed = -1;
  antenna[0].orientation = antennaOrient[3];
  antenna[0].smiley = smileyOrient[3];
} 

if (keyCode===RIGHT_ARROW) {
  if (antenna[0].xspeed === -1) {
    return;
  }
  antenna[0].yspeed = 0;
  antenna[0].xspeed = 1;
  antenna[0].orientation = antennaOrient[2];
  antenna[0].smiley = smileyOrient[2];
}



  //snake 2
  if (key === "w") {
  if (antenna[1].yspeed === 1) {
    return;
  }
  antenna[1].yspeed = -1;
  antenna[1].xspeed = 0;
  antenna[1].orientation = antennaOrient[0];
  antenna[1].smiley = smileyOrient[0];
} 

if (key==="s") {
  if (antenna[1].yspeed === -1) {
    return;
  }
  antenna[1].yspeed = 1;
  antenna[1].xspeed = 0;
  antenna[1].orientation = antennaOrient[1];
  antenna[1].smiley = smileyOrient[1];
} 

if (key==="a") {
  if (antenna[1].xspeed === 1) {
    return;
  }
  antenna[1].yspeed = 0;
  antenna[1].xspeed = -1;
  antenna[1].orientation = antennaOrient[3];
  antenna[1].smiley = smileyOrient[3];
} 

if (key==="d") {
  if (antenna[1].xspeed === -1) {
    return;
  }
  antenna[1].yspeed = 0;
  antenna[1].xspeed = 1;
  antenna[1].orientation = antennaOrient[2];
  antenna[1].smiley = smileyOrient[2];
}
}//end keyPressed




function checkSnakeCollision(n) {
  for (let i = 1; i < snakes[n].tail.length; i++) {
      if (snakes[n].tail.length > 2 && antenna[n].x === snakes[n].tail[i].x && antenna[n].y === snakes[n].tail[i].y) {
        noLoop();
        winDepends(n);
      }
    }
}



function checkWallCollision(n) {
  if (antenna[n].x === 625 || antenna[n].x <-1|| antenna[n].y === 625 || antenna[n].y < -1) {
    noLoop();
    winDepends(n);
    return;
  }
}

function twoSnakeCollison(n) {
  for (let i = 0; i < snakes[0].tail.length; i++) {
   for (let j = 0; j < snakes[1].tail.length; j++) {
      if(antenna[0].x === antenna[1].x && antenna[0].y === antenna[1].y) {
        noLoop();
        gameOver("YOU BOTH LOSE")
        return;
      } else if (antenna[0].x === snakes[1].tail[j].x && antenna[0].y === snakes[1].tail[j].y) {
        gameOver("BLUE WINS");
        noLoop();
        return;
        
      } else if (antenna[1].x === snakes[0].tail[i].x && antenna[1].y === snakes[0].tail[i].y) {
        noLoop();
        gameOver("GREEN WINS")
        return;
      }
    }
  }
}

function winDepends(numSnakes) {
   if (numSnakes === 0 && snakes.length === 1) {
    noLoop();
          gameOver("YOU LOSE")
          return;
        } else if (numSnakes===0) {
          gameOver("BLUE WINS");
          return;
        }  else if (numSnakes===1) {
          gameOver("GREEN WINS")
          return;
        }
}

function gameOver(wins) {
  soundOver.play();
  fill("white")
  text(wins, 30, 30)
  noLoop();
  return;
}