var gameState = "level1"
var bgImage;
var ground;
var alice, aliceImg;
var candyImg
var obstacle, obstacleGroup
var score = 0;

function preload() {
  bgImage = loadImage("images/Bg.jpg")
  candyImg = loadImage("images/candy.png")
  aliceImg = loadImage("images/alice.jpg")
}
function setup() {
  createCanvas(800, 400);

  alice = createSprite(100, 360, 20, 20)
  alice.addImage("a", aliceImg)
  alice.scale = 0.15;

  ground = createSprite(400, 380, 1300, 20)
  ground.velocityX = -3

  obstacleGroup = new Group();

}


function draw() {
  alice.collide(ground)
  if (gameState === "level1") {
    background("blue");
    textSize(25);
    fill("yellow")
    strokeWeight(3)
    stroke("red")
    text("ALICE IN WONDERLAND !!", 200, 200)
    text("SAVE ALICE FROM THE MONSTER AND COLLECT CANDIES", 50, 230)
    fill("red")
    textSize(20)
    text("Press SPACE to start the game", 360, 350)
    ground.visible = 0;
    alice.visible = 0;

    if (keyDown("space")) {
      gameState = "level2"
    }

  }

  if (gameState === "level2") {
    background(bgImage)
    ground.visible = 0;
    alice.visible = 1;


    if (ground.x < 0) {
      ground.x = ground.width / 2
    }

    if (keyDown("k")) {
      alice.velocityY = -3;
    }

    alice.velocityY = alice.velocityY + 0.5;
    score = score + Math.round(frameRate() / 60)

    if (alice.isTouching(obstacleGroup)) {
      gameState = "over";
    }

    spawnObstacles();
    fill(0)
    textSize(20)
    text("score: " + score, 400, 50)
  }

  if (gameState === "over") {
    background("black")
    fill("yellow")
    strokeWeight(3)
    stroke("orange")
    textSize(30)
    text("game over", 300, 200)
    obstacleGroup.destroyEach()
    alice.destroy()
  }


  drawSprites();


}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(750, 340, 20, 20)
    obstacle.addImage("obs", candyImg)
    obstacle.velocityX = -3
    obstacle.scale = 0.05
    obstacleGroup.add(obstacle)
  }
}