//gamestates 
var PLAY=1;
var END=0;
var gameState=PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameEnd;
var obstacle_image;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  obstacle_image = loadImage("obstacle1.png")
  
}

function setup(){
  
  createCanvas(600,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,530,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
obstacleGroup=new Group();

}

function draw() {

  background(0);
  
  
  
   if(gameState===PLAY){
     
     
     boy.x = World.mouseX;
     edges= createEdgeSprites();
     boy.collide(edges);
  
  //code to reset the background
     if(path.y > 400 ){
       
       path.y = height/2;
     }
  
     createCash();
     createDiamonds();
     createJwellery();
     createSword();
     obstacle();

     if (cashG.isTouching(boy)) {
       cashG.destroyEach();
      treasureCollection+=50; 
     }
     else if (diamondsG.isTouching(boy)) {
       diamondsG.destroyEach();
       treasureCollection+=150;
     }
     else if(jwelleryG.isTouching(boy)) {
       jwelleryG.destroyEach();
       treasureCollection+=100;
      
    }
     else{
      if(swordGroup.isTouching(boy)||obstacleGroup.isTouching(boy)) {
         swordGroup.destroyEach();
         gameState=END;
      }
    
     }
     
     
     
   }
   if(gameState===END){
     var gameEnd=createSprite(300, 300, 30, 30);
     gameEnd.addAnimation("gameEnd", endImg);
     swordGroup.destroyEach();
     cashG.destroyEach();
     jwelleryG.destroyEach();
     diamondsG.destroyEach();
     obstacleGroup.destroyEach();
     boy.velocityX=0;
     path.velocityY=0;
     
   }
   
   console.log(gameState);
   

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 160;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 160;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 420 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 160;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 160;
  swordGroup.add(sword);
  }
}
function obstacle(){
  if(World.frameCount % 420 ==0){
    var obstacle = createSprite(Math.round(random(50, 350),40, 10, 10 ));
    obstacle.addImage(obstacle_image);
    obstacle.velocityY=3;
    obstacle.lifetime=160;
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
  }
}