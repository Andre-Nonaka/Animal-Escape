/*global
 *  createCanvas,background, loadImage, canvas, createSlider, loadSound, keyCode
 * RIGHT_ARROW, LEFT_ARROW, DOWN_ARROW, UP_ARROW
 */
var song;
var weak;
var copImg;
var powerUpImg;
var dogImg;
var slider;
var houseImg;
var burgerImg;
var house;
var platform;
var houses = [];
var burgers = [];
var burger;
var powerUps = [];
var time;
var timer;
var dog;
//cats
var weakCat;
var redCatImg;
var greenCatImg;
var pinkCatImg;
var purpleCatImg;
var cats = [];
var activeCats = [];
var points = 0;
var dog_chomp;
var dog_die;

function preload() {
  //houses image
  houseImg = loadImage(
    "https://cdn.glitch.com/be7aaf44-de48-42e6-b555-aec9dc7e87be%2FHouse-icon%20(3).png?v=1595624186567"
  );
  //cats vs dogs song
  song = loadSound(
    "https://cdn.glitch.com/8431a6d6-b133-49c1-b19a-03c2a9a4891a%2FCats%20%26%20Dogs%202%20soundtrack%20Why%20cant%20we%20be%20friends.mp3?v=1595952319536",
    loaded
  );
  //burger image
  burgerImg = createImg(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2Frsz_19723.png?v=1596058961124"
  );
  //powerups in form of bones image
  powerUpImg = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2Fbone%20(1).png?v=1595887154876"
  );
  //dog image
  dogImg = loadImage(
    "https://cdn.glitch.com/8431a6d6-b133-49c1-b19a-03c2a9a4891a%2Fdogsvers.png?v=1595879380088"
  );
  redCatImg = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2F159604162343273041.png?v=1596041923688"
  );
  purpleCatImg = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2F159604162343273041.png?v=1596041923688"
  );
  pinkCatImg = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2F159604162343273041.png?v=1596041923688"
  );
  greenCatImg = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2F159604162343273041.png?v=1596041923688"
  );
  weakCat = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2F159603425442872220%20(1).png?v=1596056661528"
  );
  dog_chomp = loadSound(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2FCartoon%20Chomp%20Sound%20Effect.mp3?v=1595998683730"
  );
  dog_chomp.setVolume(0.05);
  dog_die = loadSound(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2FMario%20die%20sound%20effect.mp3?v=1596038907220"
  );
  dog_die.setVolume(0.05);
}

function setup() {
  //slider for song starts at 0 volume
  timer = 1800;
  slider = createSlider(0, 0.05, 0, 0.05);
  song.loop();
  reset = createButton("RESET");
  reset.position(600, 200);
  reset.mousePressed(restartGame);
  button = createButton("DOG!");
  button.mouseClicked(dogFinal);
  button.position(290, 200);
  button = createButton("BUNNY!");
  button.mouseClicked(bunny);
  button.position(400, 200);
  button = createButton("CAT!");
  button.mouseClicked(cat);
  button.position(350, 200);
  button = createButton("WOLF");
  button.mouseClicked(wolf);
  button.position(470, 200);
  button = createButton("HORSE");
  button.mouseClicked(horse);
  button.position(530, 200);
  createCanvas(800, 670);
  house = new House(200, 300);
  platform = new Platform();
  for (var i = 0; i < platform.rows; i++)
    for (var j = 0; j < platform.columns; j++) {
      if (platform.platform[i][j] === "*")
        houses.push(new House(j * 32, i * 32));
      else if (platform.platform[i][j] === "-")
        burgers.push(new Burger(j * 32, i * 32));
      else if (platform.platform[i][j] === "o")
        powerUps.push(new Powerup(j * 32, i * 32));
      else if (platform.platform[i][j] === "^") dog = new Dog(j * 32, i * 32);
      else if (platform.platform[i][j] === "r")
        cats.push(new Cat(j * 32, i * 32, redCatImg));
      else if (platform.platform[i][j] === "g")
        cats.push(new Cat(j * 32, i * 32, greenCatImg));
      else if (platform.platform[i][j] === "u")
        cats.push(new Cat(j * 32, i * 32, purpleCatImg));
      else if (platform.platform[i][j] === "i")
        cats.push(new Cat(j * 32, i * 32, pinkCatImg));
    }
  takeCats();
}
function draw() {
  //set the volume of the song by moving slider
  song.setVolume(slider.value());
  background(126, 200, 80);
  for (var i = 0; i < houses.length; i++) houses[i].show();
  for (var i = 0; i < burgers.length; i++) burgers[i].show();
  for (var i = 0; i < powerUps.length; i++) powerUps[i].show();
  for (var i = 0; i < cats.length; i++) cats[i].show();
  for (var i = 0; i < activeCats.length; i++) {
    frameRate(10);
    activeCats[i].move(houses);
    activeCats[i].show();
    if (dog.colission(activeCats[i])) {
      if (activeCats[i].isWeak === true) {
        activeCats.isWeak = false;
        cats.push(new Cat(32 * 12, 32 * 10, activeCats[i].img));
        activeCats.splice(i, 1);
        makeCatStrong();
      } else {
        dog_die.play();
        createCanvas(800, 670);
        rect(0, 0, 800, 670);
        fill(227, 101, 91);
        textSize(50);
        textAlign(CENTER);
        text("Game Over", 400, 200);
        textSize(90);
        textAlign(CENTER);
        text("Play Again!.", 400, 250);
        alert("YOU LOSE");
        window.location.reload();
      }
    }
  }
  for (var i = 0; i < powerUps.length; i++) {
    if (dog.eat(powerUps[i])) {
      makeWeak();
      powerUps.splice(i, 1);
    }
  }
  dog.show();
  textFont("Comic Sans MS");
  textSize(15);
  rect(0, 0, 200, 30);
  text("Points: " + points, 15, 25);
  for (var i = 0; i < burgers.length; i++) {
    if (dog.eat(burgers[i])) {
      burgers.splice(i, 1);
    }
  }
  if (burgers.length <= 0) {
    createCanvas(800, 670);
    rect(0, 0, 800, 670);
    fill(227, 101, 91);
    textSize(50);
    textAlign(CENTER);
    text("YOU WON!", 400, 200);
    textSize(90);
    textAlign(CENTER);
    text("Play Again!.", 400, 250);
    alert("YOU WIN");
    window.location.reload();
  }
  textSize(15);
  text("Timer: " + timer, 95, 25);

  if (timer > 0) {
    timer--;
  } else {
    dog_die.play();
    createCanvas(800, 670);
    rect(0, 0, 800, 670);
    fill(227, 101, 91);
    textSize(50);
    textAlign(CENTER);
    text("Game Over", 400, 200);
    textSize(90);
    textAlign(CENTER);
    text("Play Again!.", 400, 250);
    alert("YOU LOSE");
    window.location.reload();
    timer == 1800;
  }
}

function takeCats() {
  if (cats.length > 0) {
    var c = cats.pop();
    c.leave(platform);
    activeCats.push(c);
  }
  setTimeout(takeCats, 7000);
}
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (platform.platform[dog.y / 32][dog.x / 32 + 1] !== "*") dog.move(0);
    for (var i = 0; i < burgers.length; i++)
      if (dog.eat(burgers[i])) {
        dog_chomp.play();
        burgers.splice(i, 1);
        points = points + 1;
      }
  }
  if (keyCode === DOWN_ARROW) {
    if (platform.platform[dog.y / 32 + 1][dog.x / 32] !== "*") dog.move(1);
    for (var i = 0; i < burgers.length; i++)
      if (dog.eat(burgers[i])) {
        dog_chomp.play();
        burgers.splice(i, 1);
        points = points + 1;
      }
  }
  if (keyCode === LEFT_ARROW) {
    if (platform.platform[dog.y / 32][dog.x / 32 - 1] !== "*") dog.move(2);
    for (var i = 0; i < burgers.length; i++)
      if (dog.eat(burgers[i])) {
        dog_chomp.play();
        burgers.splice(i, 1);
        points = points + 1;
      }
  }
  if (keyCode === UP_ARROW) {
    if (platform.platform[dog.y / 32 - 1][dog.x / 32] !== "*") dog.move(3);
    for (var i = 0; i < burgers.length; i++)
      if (dog.eat(burgers[i])) {
        dog_chomp.play();
        burgers.splice(i, 1);
        points = points + 1;
      }
  }
}

function restartGame() {
  window.location.reload();
}
//load song
function loaded() {
  song.play();
}
function makeWeak() {
  for (var i = 0; i < activeCats.length; i++) activeCats[i].isWeak = true;
}
function makeCatStrong() {
  for (var i = 0; i < activeCats.length; i++) activeCats[i].isWeak = false;
}
function dogFinal() {
  dogImg = loadImage(
    "https://cdn.glitch.com/8431a6d6-b133-49c1-b19a-03c2a9a4891a%2Fdogsvers.png?v=1595879380088"
  );
}
function bunny() {
  dogImg = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2F159603395873355078.png?v=1596036654616"
  );
}
function cat() {
  dogImg = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2F159603406537460862.png?v=1596038501709"
  );
}
function wolf() {
  dogImg = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2F159603450605925763.png?v=1596058774721"
  );
}
function horse() {
  dogImg = loadImage(
    "https://cdn.glitch.com/d6a973ed-acbb-475e-98c8-60356ed6f674%2F159635716574530.png?v=1596118093365"
  );
}
