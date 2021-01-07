var player, score, playerImg, playerI,invisibleGround;
var obstacle, obstaclesGroup;
var bg1, bg2, bg3;
var ground1, ground2, ground3;
var ninjaImg, soldierImg, bombImg;
var weapon1, weapon2, weapon3, weapon4, weapon5;
var gameState = 1;
var gameOver, restart, gameOverImg, restartImg;
var gun1, gun2, gun3, gun4, gun5;

function preload(){
  playerImg = loadAnimation("Assets/Player/man1.png","Assets/Player/man2.png","Assets/Player/man3.png","Assets/Player/man4.png","Assets/Player/man5.png","Assets/Player/man6.png","Assets/Player/man7.png","Assets/Player/man8.png");
  bg1 = loadImage("Assets/Backgrounds/forest.png");
  bg2 = loadImage("Assets/Backgrounds/desert.png");
  //bg3 = loadImage("Assets/Backgrounds/cave.jpg");
  gameOverImg = loadImage("Assets/gameOver.png");
  restartImg = loadImage("Assets/restart.png");
  ninjaImg = loadAnimation("Assets/Obstacles/ninja1.png","Assets/Obstacles/ninja2.png","Assets/Obstacles/ninja3.png","Assets/Obstacles/ninja4.png","Assets/Obstacles/ninja5.png","Assets/Obstacles/ninja6.png");
  soldierImg = loadAnimation("Assets/Obstacles/soldier1.png","Assets/Obstacles/soldier2.png","Assets/Obstacles/soldier3.png","Assets/Obstacles/soldier4.png","Assets/Obstacles/soldier5.png",)
  bombImg = loadImage("Assets/Obstacles/Bomb.png");
  gun1 = loadImage("Assets/Weapons/gun1.png");
  gun2 = loadImage("Assets/Weapons/gun2.png");
  gun3 = loadImage("Assets/Weapons/gun3.png");
  gun4 = loadImage("Assets/Weapons/gun4.png");
  gun5 = loadImage("Assets/Weapons/gun5.png");
}

function setup(){
  createCanvas(1000,400);

  ground1 = createSprite(10,50,width,height);
  ground1.visible =true;
  ground1.addImage(bg1);
  ground1.scale = 2;
  ground1.x = ground1.width;

  ground2 = createSprite(10,200,width,height);
  ground2.visible = false;
  ground2.addImage(bg2);
  ground2.scale = 0.95;
  ground2.x = ground2.width;

 /* ground3 = createSprite(10,70,width,height);
  ground3.visible = false;
  ground3.addImage(bg3);
  ground3.scale = 3;
  ground3.x = ground3.width;*/

  invisibleGround = createSprite(500,380,1000,10);
  invisibleGround.visible = false;

  gameOver = createSprite(500,170,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.05;
  gameOver.visible = false;

  restart = createSprite(500,220,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;

  player = createSprite(70,345,20,20);
  player.addAnimation("running",playerImg);
  player.scale = 0.5;
  player.setCollider("rectangle",0,0,player.width-130,player.height-20);

  weapon1 = createSprite(70,player.y-90,20,20);
  weapon1.addImage(gun1);
  weapon1.visible = false;

  weapon2 = createSprite(70,player.y-90,20,20);
  weapon2.addImage(gun2);
  weapon2.visible = false;

  weapon3 = createSprite(70,player.y-90,20,20);
  weapon3.addImage(gun3);
  weapon3.visible = false;

  weapon4 = createSprite(70,player.y-90,20,20);
  weapon4.addImage(gun4);
  weapon4.visible = false;

  weapon5 = createSprite(70,player.y-90,20,20);
  weapon5.addImage(gun5);
  weapon5.visible = false;

  score = 0;
  obstaclesGroup = new Group();
  //player.debug = true;

}

function draw(){

  background(220);
  weapon1.y = player.y - 90;
  weapon2.y = player.y - 90;
  weapon3.y = player.y - 90;
  weapon4.y = player.y - 90;
  weapon5.y = player.y - 90;
  
  if(gameState===1){
    ground1.velocityX = -5;
    ground2.velocityX = -5;
    //ground3.velocityX = -5;
    if(ground1.x<300){
      ground1.x = 500;
    }

    if(ground2.x<200){
      ground2.x = 500;
    }

   /* if(ground3.x<300){
      ground3.x = 500;
    }*/

    if(score<2000){
      ground1.visible = true;
    }
    else if(score>2000 && score<4000){
      ground2.visible = true;
      ground1.visible = false;
    }
    /*else if(score>400){
      ground3.visible = true;
      ground1.visible = false;
      ground2.visible = false;
    }*/

    if(keyDown("space")&& player.y>200){
      player.velocityY = -20;
    }
    player.velocityY = player.velocityY + 0.8;
    
    score = score + Math.round(getFrameRate()/30);
    spawnObstacles();

    if(player.isTouching(obstaclesGroup)){
      gameState = 0;
    }

    if(score>500){
      weapon1.visible = true;
    }

    if(score>1500){
      weapon2.visible = true;
      
    }

    if(score>2500){
      weapon3.visible = true;
      
    }

    if(score>4000){
      weapon3.visible = true;
      
    }

    if(score>6000){
      weapon4.visible = true;
      
    }

  }

  if(gameState===0){
    player.visible = false;
    obstaclesGroup.destroyEach();
    weapon1.visible = false;
    weapon2.visible = false;
    weapon3.visible = false;
    weapon4.visible = false;
    weapon5.visible = false;
    gameOver.visible = true;
    restart.visible = true;
    ground1.velocityX = 0;
    ground2.velocityX = 0;
    //ground3.velocity = 0;
    if(mousePressedOver(restart)){
      reset();
    }
  }

  
  player.collide(invisibleGround);
  obstaclesGroup.collide(invisibleGround);
  
  drawSprites();
  textSize(18);
  fill("white");
  text("Score:"+score,20,20);

}

function spawnObstacles(){
  if(frameCount%150===0){
    obstacle = createSprite(1000,310,10,10);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstacle.addAnimation("ninja",ninjaImg);
      obstacle.scale = 0.9;
      break;
      case 2: obstacle.addAnimation("soldier",soldierImg);
      obstacle.scale = 0.28;
      break;
      case 3: obstacle.addImage(bombImg);
      obstacle.scale = 0.3;
      obstacle.y = 315;
      break;
      default: break;
    }
    obstacle.velocityX= -7;
    obstacle.lifetime = 1200;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = 1;
  player.visible = true;
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  ground1.visible = true;
  ground2.visible = false;
  //ground3.visible = false;
}
  