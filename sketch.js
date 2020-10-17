var dogImage, dog, happyDogImg;
var database;
var foodS, foodStock;
var state = 0;
var feed, refill;
var feedImage, refillImage;

function preload(){
  dogImage = loadAnimation("images/dogImg.png");
  happyDogImg = loadAnimation("images/dogImg1.png");
  refillImage = loadImage("images/Refill.png")
}

function setup(){
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,50,50);
  dog.addAnimation("normalDog", dogImage);
  dog.addAnimation("happy", happyDogImg)
  dog.scale = 0.4;
  refill = createSprite(50,400,20,20);
  refill.addImage("refilling", refillImage);
  refill.scale = 0.2;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw(){
  background(46, 139, 87);
  if(state === 0){
    if(keyWentDown(UP_ARROW)){
      Feed();
      for(var i = 0; i < 1; i++){
      changeImage();
    }
  }
}
  if(foodS === 0){
    state = 1;
    dog.changeAnimation("normalDog", dogImage);
  } else {
    state = 0;
  }

  if(mousePressedOver(refill)){
    Refill();
  }

  drawSprites();
  textSize(20);
  fill(255);
  stroke(10);
  text("Milk Bottles Left: " + foodS, 50, 40);
  text("Press The UP Arrow Key To Feed The Dog Milk!", 50, 20);

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
function Feed(){
  foodS -= 1;
  writeStock(foodS);
}
function changeImage(){
  dog.changeAnimation("happy", happyDogImg);
 if(foodS <= 5){
   for(var i = 0; i < 1; i++){
   alert("Food Stock Is Running Low, Kindly Refill");
 }
}
}
function Refill(){
  if(foodS < 5){
    foodS += 10;
    writeStock(foodS);
  }
}