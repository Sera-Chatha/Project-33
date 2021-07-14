const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

//create variables
var engine, world;
var backgroundImg, backgroundImg1;
var girlCharacter, girlCharacterImage;
var invisibleGround; 
var iceSkater, iceSkaterImage;
var iceBallImage;
var snowflake1Image, snowflake2Image;

function preload (){
//load images 
getBackgroundImage();
girlCharacterImage = loadImage ("girl sprite.png");
snowflake1Image = loadImage ("snow4.webp");
iceSkaterImage = loadImage ("girl sprite 2.png");
iceBallImage = loadImage  ("ice ball.png");
snowflake2Image = loadImage ("snow5.webp");
}

function setup() {
  createCanvas(1280,575);

  engine = Engine.create();
  world = engine.world;
  //create girl character
  girlCharacter = createSprite(400, 370, 50, 50);
  girlCharacter.addImage("girlCharacter",girlCharacterImage);

  iceSkater = createSprite(1000, 370, 50, 50);
  iceSkater.addImage("iceSkater",iceSkaterImage);
  
  //create invisible ground
  invisibleGround = createSprite(windowWidth / 2, 670, windowWidth, 10);
  invisibleGround.visible = false;

}

function draw() {
  background(backgroundImg);  
  Engine.update (engine);
  //move girl Character sprite left and right 
  if (keyDown(LEFT_ARROW)){
    changePosition (-3,0);
  }
  if (keyDown(RIGHT_ARROW)){
    changePosition (3,0);
  }
  //make girl Character sprite jump and gravity enacted
  if (keyDown(UP_ARROW)){
    girlCharacter.velocityY = -12;
  }
  girlCharacter.velocityY = girlCharacter.velocityY + 0.8;
  girlCharacter.collide(invisibleGround);

  //make ice Skater sprite jump and gravity enacted
  iceSkater.velocityY = iceSkater.velocityY + 0.8;
  iceSkater.collide(invisibleGround);

  drawSprites();
}

function changePosition (x,y){
  girlCharacter.x = girlCharacter.x + x;
  girlCharacter.y = girlCharacter.y + y; 
}

//move iceSkater sprite left and right
function keyPressed (){
  if (keyCode === 65){
    iceSkater.x = iceSkater.x -6; 
    }
    if (keyCode === 68){
      iceSkater.x = iceSkater.x +6; 
    }
    if (keyCode === 87){
      iceSkater.velocityY = -12;; 
    }
}

async function getBackgroundImage(){
  var request = await fetch("https://worldtimeapi.org/api/timezone/Australia/Brisbane")
  var responseJSON = await request.json();

  var dateTime = responseJSON.datetime;
  var month= dateTime.slice (5,7);
  if (month===06)  {
      backgroundImg1 = "snow1.png"
  }if (month===07){
    backgroundImg1 = "snow2.png"
  }if (month===08){
      backgroundImg1 = "snow3.png"
  }

  backgroundImg = loadImage(backgroundImg1);
}
