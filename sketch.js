var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var heroes, hero1, hero2;

function preload(){
  // hero1Img = loadImage("images/hero1.png")
  // hero2Img = loadImage("images/hero2.png")
  // car3Img = loadImage("images/car3.png")
  // car4Img = loadImage("images/car4.png")
  hero1Img = loadImage("superhero.png")
  hero2Img = loadImage("superhero1(1).png")
  backgroundImg = loadImage("background.jpg")

   trackImg = loadImage("images/track.jpg")

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
     game.end();
  }
}
