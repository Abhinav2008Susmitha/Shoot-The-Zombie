var bg,bgImg;
var player, shooterImg, shooter_shooting;
var explosionSound,loseSound,winSound;
var zombie,zombieImg,zombieGroup;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life = 3;
var gameState = "play"


function preload() {

  bgImg = loadImage("./assets/bg.jpeg");
  shooterImg = loadImage("./assets/shooter_2.png");
  shooter_shooting = loadImage("./assets/shooter_3.png");
  zombieImg = loadImage("./assets/zombie.png");
  explosionSound = loadSound("./assets/explosion.mp3");
  loseSound = loadSound("./assets/lose.mp3");
  winSound = loadSound("./assets/win.mp3");
  heart1Img = loadImage("./assets/heart_1.png");
  heart2Img = loadImage("./assets/heart_2.png");
  heart3Img = loadImage("./assets/heart_3.png");

}

function setup() {
 createCanvas(1000,800);
 
 player = createSprite(100,400,50,20);
 player.addImage(shooterImg);
 player.scale = 0.4;

 heart1 = createSprite(750,50,20,20);
 heart1.addImage("heart1",heart1Img);
 heart1.scale = 0.4;

 heart2 = createSprite(710,50,20,20);
 heart2.addImage("heart2",heart2Img);
 heart2.scale = 0.4;

 heart3 = createSprite(750,50,40,20,20);
 heart3.addImage("heart3",heart3Img);
 heart3.scale = 0.4;

 zombieGroup = new Group();
 bulletGroup = new Group();

}

function draw() {
 background(bgImg);

 if(gameState === "play"){
  if(keyDown(UP_ARROW)){
    player.y = player.y -20;
  }
  if(keyDown(DOWN_ARROW)){
    player.y = player.y +20;
  }
  if(keyWentDown("space")){
    player.addImage(shooter_shooting);
  }
  else if(keyWentUp("space")){
    player.addImage(shooterImg);
  } 
  if(keyWentDown("space")) {
    bullet = createSprite(50,player.y - 30,20,10);
    bullet.velocityX = 20;
    bulletGroup.add(bullet);
    player.depth = bullet.depth;
    player.depth = player.depth + 2;
  }

  if(life === 3){
    heart3.visible = true;
    heart1.visible = false;
    heart2.visible = false;
  }
  if(life === 2){
    heart2.visible = true;
    heart1.visible = false;
    heart3.visible = false;
  }
  if(life === 1){
    heart1.visible = true;
    heart3.visible = false;
    heart2.visible = false;
  }
  for(var i=0;i<zombieGroup.length;i++){     

    if(zombieGroup[i].isTouching(player)){
         zombieGroup[i].destroy();
         loseSound.play();
         life=life-1;
         } 
   }  
  if(life===0){
    heart1.visible = false;
    gameState = "end"
    gameOver();
  }
  if(zombieGroup.isTouching(bulletGroup)) {
    for(i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)) {
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
      }
    }
  }
  spawnZombies();
 } 
 if(gameState == "end"){
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
  player.destroy(); 
 }

 drawSprites();
}

function spawnZombies() {

 if(frameCount % 50 === 0) {
   zombie = createSprite(random(400,800),random(400,800),40,40);
   zombie.addImage(zombieImg);
   zombie.velocityX =-3;
   zombie.scale = 0.20;
   zombieGroup.add(zombie);
   zombie.lifetime = 400;
   
 }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
