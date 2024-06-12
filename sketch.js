let ballX = 300;
let ballY = 200;
let ballDiameter = 15;
let ballRadius = ballDiameter / 2;

let ballVelocityX = 6;
let ballVelocityY = 6;

let opponentRacketX = 585;
let opponentRacketY = 150;

let racketX = 5;
let racketY = 150;
let racketWidth = 10;
let racketHeight = 90;

let myPoints = 0;
let opponentsPoints = 0;

let soundCollide;
let soundPoint;
let soundtrack;

let ballRacketCollide = false;

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(0);

  drawBall();
  moveBall();
  ballBorderCollision();
  
  drawRacket(racketX, racketY);
  moveRacket();
  verifyCollision(racketX, racketY);
  verifyCollision(opponentRacketX, opponentRacketY);
  drawRacket(opponentRacketX, opponentRacketY);
  moveOpponentRacket();
  drawScore();
  addPoints();
}

function drawBall(){
  fill(255)
  circle(ballX, ballY, ballDiameter);
}

function moveBall(){  
  ballY += ballVelocityY;
  ballX += ballVelocityX;
}

function ballBorderCollision(){
  if(ballX + ballRadius > width || ballX - ballRadius < 0){
    ballVelocityX *= -1;
  }
  if(ballY + ballRadius> height || ballY - ballRadius < 0){
    ballVelocityY *= -1;
  }
}

function drawRacket(x, y){
  fill(255);
  rect(x, y, racketWidth, racketHeight);
}

function moveRacket(){
  if(keyIsDown(UP_ARROW)){
    racketY -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    racketY += 10;
  }
}

function verifyCollision(x, y){
  collide = collideRectCircle(x, y, racketWidth, racketHeight, ballX, ballY, ballRadius);
  if(collide){
    ballVelocityX *= -1;
    soundCollide.play();
  }
}

function moveOpponentRacket(){
  opponentVelocityY = ballY - opponentRacketY - racketWidth / 2 - 30;
  opponentRacketY += opponentVelocityY;
}

function drawScore(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myPoints, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255)
  text(opponentsPoints, 470, 26);
}

function addPoints(){
  if(ballX > 590){
    myPoints += 1;
    soundPoint.play();
  }
  if(ballX < 11){
    opponentsPoints += 1;
    soundPoint.play();
  }
}

function preload(){
  soundtrack = loadSound("soundtrack.mp3");
  soundPoint = loadSound("soundpoint.mp3");
  soundCollide = loadSound("soundcollide.mp3");
}