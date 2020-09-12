var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudImage;
var obsatcleImage2,score;
var obstaclesGroup
var gameState="PLAY";
function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(0,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,600,20);
  ground.addImage("ground",groundImage);
  ground.velocityX = 0;
  
  invisibleGround = createSprite(200,190,600,10);
  invisibleGround.visible = false;

  gameOver = createSprite(trex.x,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(trex.x,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  score = 0;
}

function draw() {
  console.log(World.frameCount)
  console.log(trex.x)

  background(255);
  text("Score: "+ score, trex.x+200,50);
  
restart.x=trex.x;
gameOver.x=trex.x;

  if (gameState==="PLAY"){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -14;
    }
  
    trex.velocityY = trex.velocityY + 0.8
    trex.velocityX = 5;
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(trex.x>500&&World.frameCount % 200 === 0){
   
      ground.x=trex.x;
       
      }
   
    
    if(trex.x>500){
  invisibleGround.x=trex.x;
  
  }
      camera.position.x = trex.x;
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = "END";
    }
  }
  else if (gameState === "END") {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0

    trex.velocityY = 0;
    trex.velocityX = 0;
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}
function spawnClouds(){
if(World.frameCount % 60 === 0) {
var cloud;
cloud = createSprite(trex.x+400,60,20,20)  ;
cloud.addImage(cloudImage);
cloudsGroup.add(cloud);
cloud.velocityX=0;
cloud.scale= 0.7;
  }

}

function spawnObstacles(){
  if(World.frameCount % 100 === 0) {
    var obstacle;
    obstacle = createSprite(trex.x+400,160,20,20);
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    obstaclesGroup.add(obstacle);
    obstacle.velocityX =0;
    obstacle.scale = 0.7; 
  }
}


function reset(){
trex.x=0;
ground.x=200;
invisibleGround.x=200

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  gameOver.visible = false;
  restart.visible = false;
  
  gameState = "PLAY";
  
  trex.changeAnimation("running",trex_running);
 
  score = 0;
 
}



