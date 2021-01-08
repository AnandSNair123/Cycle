var road, road1;
var mainPlayer, mainPlayer1;
var cycle1, cycle2, cycle3, pinkGroup, yellowGroup, redGroup;
var distance = 0;
var fall, fall1, fall2, fall3;
var cycles1, cycles2, cycles3;
var gamestate;
var start = 1;
var end = 0;
var gameover, gameover1;
var obstacle, obstacles1, obstacles2, obstacles3, obstaclesrand, obGroup;
var rand, rands;


function preload() {
  road1 = loadImage("images/Road.png");
  mainPlayer1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  cycle1 = loadAnimation("opponent1.png", "opponent2.png");
  cycle2 = loadAnimation("opponent4.png", "opponent5.png");
  cycle3 = loadAnimation("opponent7.png", "opponent8.png");
  fall = loadAnimation("images/mainPlayer3.png");
  fall1 = loadAnimation("opponent3.png");
  fall2 = loadAnimation("opponent6.png");
  fall3 = loadAnimation("opponent9.png");
  gameover1 = loadAnimation("gameOver.png");
  obstacles1 = loadAnimation("obstacle1.png");
  obstacles2 = loadAnimation("obstacle2.png");
  obstacles3 = loadAnimation("obstacle3.png");



}

function setup() {
  createCanvas(600, 300);
  gamestate = start;
  road = createSprite(200, 150, 5, 5);
  road.addImage("1", road1);




  mainPlayer = createSprite(50, 200, 5, 5);
  mainPlayer.addAnimation("2", mainPlayer1);
  mainPlayer.scale = 0.06;
  mainPlayer.setCollider("rectangle", 0, 0, 1200, 1200);

  gameover = createSprite(300, 150);
  gameover.addAnimation("gameover", gameover1);

  pinkGroup = createGroup();
  yellowGroup = createGroup();
  redGroup = createGroup();
  obGroup = createGroup();

  //cycles1.addAnimation("pink", cycle1);
  // cycles1.addAnimation("pinks", fall1);
  // cycles2.addAnimation("red", cycle2);
  // cycles2.addAnimation("reds", fall2);
  //cycles3.addAnimation("yellow", cycle3);

  //cycles3.addAnimation("yellows", fall3);



}

function draw() {
  background("white");

  drawSprites();
  obstacles();
  cycle();

  if (gamestate === start) {
    mainPlayer.y = World.mouseY;
    edges = createEdgeSprites();
    gameover.visible = false;
    mainPlayer.bounceOff(edges);
    road.velocityX = -(3 + distance / 50);
    if (road.x < 10) {
      road.x = width / 2;
    }
    if (frameCount % 100 ) {
      distance = distance + 1;
    }

    
    if (pinkGroup.isTouching(mainPlayer)) {

      cycles1.addAnimation("c1", fall1);
      pinkGroup.setLifetimeEach(-1);
      redGroup.destroyEach();
      yellowGroup.destroyEach();
      obGroup.destroyEach();
      gamestate = end;

    }
    if (yellowGroup.isTouching(mainPlayer)) {

      cycles2.addAnimation("c2", fall2);
      yellowGroup.setLifetimeEach(-1);
      redGroup.destroyEach();
      pinkGroup.destroyEach();
      obGroup.destroyEach();
      gamestate = end;

    }
    if (redGroup.isTouching(mainPlayer)) {

      cycles3.addAnimation("c3", fall3);
      redGroup.setLifetimeEach(-1);
      pinkGroup.destroyEach();
      obGroup.destroyEach();
      yellowGroup.destroyEach();

      gamestate = end;

    }
    if (obGroup.isTouching(mainPlayer)){
      obGroup.setLifetimeEach(-1);
      pinkGroup.destroyEach();
      redGroup.destroyEach();
      yellowGroup.destroyEach();
      obGroup.setVelocityXEach(0);
      gamestate = end;

    }



  }
  if (gamestate === end) {
    mainPlayer.addAnimation("2", fall);
    gameover.visible = true;
    distance = 0;
    pinkGroup.setVelocityXEach(0);
    redGroup.setVelocityXEach(0);
    yellowGroup.setVelocityXEach(0);
    obGroup.setVelocityXEach(0);
    pinkGroup.destroyEach();
    redGroup.destroyEach();
    yellowGroup.destroyEach();
    obGroup.destroyEach();
    road.velocityX = 0;
    fill("black");
    textSize(20);
    text("PRESS R TO RESTART", gameover.x - 145, gameover.y + 50);
    if (keyDown("r")) {
      reset();

    }

  }






  fill("aqua");
  textSize(17);
  distance = distance + Math.round(getFrameRate() / 65);
  text("Distance =" + " " + distance + "mt", 450, 40);
}

function cycle() {
  rand = Math.round(random(25, 275));
  if (frameCount % 100 === 0) {
    var ran = Math.round(random(1, 3));
    console.log(ran);
    switch (ran) {
      case 1:
        cycles1 = createSprite(600, rand, 5, 5);
        cycles1.addAnimation("c1", cycle1);
        cycles1.scale = 0.05;
        cycles1.lifetime = 185;
        gameover.depth = cycles1.depth;
        gameover.depth = gameover + 1;
        pinkGroup.add(cycles1);


        break;
      case 2:
        cycles2 = createSprite(600, rand, 5, 5);
        console.log(rand);
        cycles2.addAnimation("c2", cycle2);
        cycles2.scale = 0.05;
        cycles2.lifetime = 185;
        gameover.depth = cycles2.depth;
        gameover.depth = gameover + 1;
        yellowGroup.add(cycles2);


        break;
      case 3:
        cycles3 = createSprite(600, rand, 5, 5);
        cycles3.addAnimation("c3", cycle3);
        cycles3.scale = 0.05;
        cycles3.lifetime = 185;
        gameover.depth = cycles3.depth;
        gameover.depth = gameover + 1;
        redGroup.add(cycles3);

        break;
    }
    pinkGroup.setVelocityXEach(-(3 + distance / 50));
    redGroup.setVelocityXEach(-(3 + distance / 50));
    yellowGroup.setVelocityXEach(-(3 + distance / 50));


  }






}

function obstacles() {
  rands = Math.round(random(25, 275));
  if (frameCount % 200 === 0) {
    obstacle = createSprite(600, rands, 5, 5);
    
    obstaclesrand = Math.round(random(1, 3))
    switch (obstaclesrand) {
      case 1:
        obstacle.addAnimation("ob1", obstacles1);
        obstacle.scale = 0.1;
        break;
      case 2:
        obstacle.addAnimation("ob2", obstacles2);
        obstacle.scale = 0.1;
        break;

      case 3:
        obstacle.addAnimation("ob3", obstacles3);
        obstacle.scale = 0.1;
        break;

    }
    obstacle.lifeitme = 10;
    obGroup.add(obstacle);
    obGroup.setVelocityXEach(-(3 + distance / 50));

  }
}

function reset() {
  gamestate = start;
  mainPlayer.addAnimation("2", mainPlayer1);
  cycles1.addAnimation("c1", cycle1);
  cycles2.addAnimation("c2", cycle2);
  cycles3.addAnimation("c3", cycle3);
  pinkGroup.destroyEach();
  redGroup.destroyEach();
  yellowGroup.destroyEach();
  obGroup.destroyEach();

}