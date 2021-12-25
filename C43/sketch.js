var canvas;
var player;
var obstacle;
var path;

function preload() {
player_running = loadAnimation("./assets/1.PNG","./assets/2.PNG","./assets/3.PNG","./assets/4.PNG",
"./assets/5.PNG","./assets/6.PNG","./assets/7.PNG","./assets/8.PNG",);
}

function setup() {
  canvas = createCanvas(windowWidth-100, windowHeight-100);
  player = createSprite(500,472,25,25);
  player.addAnimation("running",player_running);
  player.shapeColor = "red";
  obstacle = createSprite(1000,475,15,15);
  obstacle.shapeColor = "blue";
  
  path = createSprite(width/2,500,windowWidth*3,30);
  path.shapeColor = "black";
  path.velocityX = 4;
}

function draw() {
  background(100);

  obstacle.velocityY = -5;

  if(keyIsDown(LEFT_ARROW)){
    player.position.x -= 5;
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.position.x += 5;
  }
  if(keyDown("space") && player.position.y>405){
    player.position.y -= 20;
    player.position.x +=3;
  }
  
  player.position.y += 8;
  if(path.x < 0){
    path.x = width/2;
  }
  if(player.collide(obstacle) || obstacle.collide(player)){
    player.position.x = 500;
    player.position.y = 472;
    obstacle.position.x = 1000;
    obstacle.position.y = 470;
  } 

  player.collide(path);
  obstacle.collide(path);
  player.collide(obstacle);
  obstacle.collide(player);

  drawSprites();
}