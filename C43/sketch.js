var canvas;
var player;
var obstacle;
var path;
var blade,bladeGroup;
var score;
var backgroundImg,back;

function preload() {
player_running = loadAnimation("./assets/1.PNG","./assets/2.PNG","./assets/3.PNG","./assets/4.png",
"./assets/5.png","./assets/6.png","./assets/7.png","./assets/8.png");
blade_Img = loadImage("./assets/ninja blade.png");
backgroundImg = loadImage("./assets/destroyed city.jpg"); 
}

function setup() {
  canvas = createCanvas(windowWidth-100, windowHeight-100);

  player = createSprite(500,472,25,25);
  player.addAnimation("running",player_running);
  player.shapeColor = "red";
  
  obstacle = createSprite(1000,475,15,15);
  obstacle.shapeColor = "red";
  obstacle.setVelocity(-5,0);
  
  path = createSprite(width/2,500,windowWidth*3,30);
  path.shapeColor = "black";
  path.velocityX = 4;

  back = createSprite(width/2,height/2);
  back.scale = 2.5;
  back.addImage(backgroundImg);
  back.depth = player.depth;
  player.depth += 1;

  bladeGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(100);
  
  if(keyIsDown(LEFT_ARROW)){
    player.position.x -= 5;
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.position.x += 5;
  }
  if(keyDown("space") && player.position.y>395){
    player.position.y -= 20;
    player.position.x +=3;
  }
  if(keyWentDown("e")){
    spawnBlade1();
  }
  if(bladeGroup.collide(obstacle)){
    bladeGroup.destroyEach();
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
  fill("white");
  textSize(25);
  text("Score :"+score,67,70);
  if(frameCount%15 == 0){
    score += 1;
  }
}

function spawnBlade1(){
  blade = createSprite(player.position.x,player.position.y);
  blade.addImage(blade_Img);
  blade.scale = 0.25;
  blade.lifetime = 80;
  blade.setVelocity(7,0);
  bladeGroup.add(blade);
}
