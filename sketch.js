var monkey , monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var foodGroup, obstacleGroup;
var score_time;
var ground,ground1,invisibleGround;
var PLAY=1;
var END=0;
var gamestate = PLAY;

function preload(){
  
  
  monkey_running =                  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,450);
     ground=createSprite(300,383,600,25);
     ground.velocityX = -4;
     ground.x = ground.width/2;
     console.log(ground.x);
  
     monkey=createSprite(60,350,10,10);
     monkey.scale=0.1
     monkey.addAnimation("running",monkey_running);

     invisibleGround = createSprite(200,388,400,10);
     score_time = 0;
     invisibleGround.visible = false;
     
     ground1 = createSprite(500,383,470,25);
  
     foodsGroup = createGroup();
     obstaclesGroup = createGroup();
}

function draw() {
   background(150);
   fill(51);
   text("Survival Time = "+score_time,250,30);
   
  if(gamestate===PLAY)
   score_time = Math.round(frameCount/70);
   if(keyDown("space")&&monkey.y>320){
      monkey.velocityY = -14;
   }
    monkey.velocityY = monkey.velocityY+0.7;
    monkey.collide(invisibleGround)
    bananas();
    stones();
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(obstaclesGroup.collide(monkey)){
      foodsGroup.destroyEach();
      foodsGroup.setLifetimeEach(-1);
      gamestate = END;
    }
   
   if(gamestate===END){
     score_time = score_time+0;
     foodsGroup.velocityX = 0;
     foodsGroup.destroyEach();
     obstaclesGroup.destroyEach();  
     text("GAME OVER",300,250);
   }
   
   
   drawSprites();
}

function bananas(){
  if(frameCount%110===0){
  banana = createSprite(130,160,2,2);
  banana.addImage("food",bananaImage);
  banana.scale = 0.1;
  banana.y = Math.round(random(200,270));
  banana.x = 600;
  banana.velocityX = -2;
  foodsGroup.add(banana);
    
  }
}
function stones(){
   if(frameCount%300===0){
      obstacle = createSprite(600,362,20,20);
      obstacle.addImage("stone",obstacleImage);
      obstacle.velocityX = -2;
      obstacle.scale = 0.1;
      obstaclesGroup.add(obstacle);
  }
}
 



