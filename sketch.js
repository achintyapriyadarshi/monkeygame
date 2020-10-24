
var monkey , monkey_running;
var cloudsImg;

var cloudGroup,obstacleGroup,bananaGroup;

var PLAY=1;
var END=0;
var gameState=PLAY;

var timer=0;

bananaCount=0;

var ground,groundImg,soil;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){

  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
monkey=createSprite(100,350,20,20);
monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(200,382,400,10);
  ground.shapeColor="green";
 
  
  soil=createSprite(200,391,400,18);
  soil.shapeColor="brown";

  
  
  
  
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
}


function draw() {

  background("skyblue");
  
  
  SpawnObstacles();
  
  if(gameState==PLAY){
  
    if(monkey.isTouching(bananaGroup)){
        bananaGroup.destroyEach();
      
      bananaCount=bananaCount+1;
       }
    
  if(keyDown("space") && monkey.y>345)
  {
    monkey.velocityY=-13;  
  }
  monkey.velocityY=monkey.velocityY+0.5;
    
    if(monkey.isTouching(obstacleGroup)){
      
     gameState=END; 
    }
  }
  
  monkey.collide(obstacleGroup);
 monkey.collide(ground);
 

    if(gameState==END){
    obstacleGroup.setVelocityXEach(0);
  
    bananaGroup.setVelocityXEach(0);
    
     
      
     bananaGroup.setLifetimeEach(-1); 
    obstacleGroup.setLifetimeEach(-1);
  
      monkey.velocityX=0;
      monkey.velocityY=0;
       }
  
  Spawnbananas();
  drawSprites();
  textSize(20);
  stroke("black");
  fill("black");
  if(gameState==PLAY){
  timer=Math.ceil(frameCount/frameRate());
  
}
  text("Survival time: "+timer,130,40);
  text("Bananas Collected: "+bananaCount,130,70);
  
  if (gameState==END){
    text("Game Over",150,170);
    text("Your Survival Time; "+timer,150,200);
    text("Bananas You Collectd: "+bananaCount,150,230);
  }



}


function SpawnObstacles()
{
  var obstacle=createSprite(600,360,70,70);
  obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
 obstacle.debug=true;
  obstacleGroup.add(obstacle);
 if (frameCount % 300 === 0) {

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
  
    obstacle.lifetime = 200;
   
  } 
  
}

function Spawnbananas()
{
  var banana=createSprite(600,300,30,30);
  bananaGroup.add(banana);
  banana.y=Math.round(150,200);
 if (frameCount % 140 === 0) {

    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
  
    banana.lifetime = 250;
   
  } 
  
}