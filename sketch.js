var monkey,monkey_running;
var ground,groundimage,invisibleground; 
var banana,bananaimage; 
var stone, stoneimage;
var foodGroup,obstacleGroup;
var score;

function preload(){
monkey_running = loadAnimation ("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
groundimage=loadImage("jungle.jpg");  
bananaimage=loadImage("banana.png");
stoneimage=loadImage("stone.png");
}

function setup() {
createCanvas(800, 400);
  
invisibleground=createSprite(200,340,400,10);
invisibleground.visible=false;

ground=createSprite(200,10,400,40);
ground.addImage("ground",groundimage);
ground.scale=1.6;  
ground.x = ground.width/2; 
ground.velocityX = -4;
  
  
monkey=createSprite(100,340,20,50);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1; 

foodGroup = new Group();  
obstacleGroup = new Group();
 
  score=0;
}

function draw() {
background(220);
  
  if (ground.x<0){
   ground.x = ground.width/2;  
  }
 
  if (keyDown("space")){
    monkey.velocityY=-10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (foodGroup.isTouching(monkey)){
  foodGroup.destroyEach();
   score=score+2; 
  }
  switch(score){
   case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16;
      break; 
      case 40: monkey.scale=0.18;
      break; 
      default: break;   
  } 
  
  if (obstacleGroup.isTouching(monkey)){
    monkey.scale=0.08;
  }
  
monkey.collide(invisibleground);
spawnObstacles();
spawnfood();
drawSprites();
  stroke("white"); 
  textSize(20); 
  fill("white"); 
  text("Score: "+ score, 500,50);
}



function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(stoneimage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function spawnfood() {
  if(frameCount % 80 === 0) {
    var food = createSprite(600,250,40,10);
    food.y=random(120,200);
    food.velocityX = -5;
    food.addImage(bananaimage);
    //assign scale and lifetime to the obstacle           
    food.scale = 0.05;
    food.lifetime = 300;
    monkey.depth = food.depth+1;
    foodGroup.add(food);
  }
}