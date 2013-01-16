var canvas;
var stage;
var screen_width;
var screen_height;
var bmpAnimation;

var imgKarateWalk = new Image();

function init() {
  canvas = document.getElementById("game");

  imgKarateWalk.onload = handleImageLoad;
  imgKarateWalk.onerror = handleImageError;
  imgKarateWalk.src = "img/karate-walk-spritesheet.png";
}

function reset() {
  stage.removeAllChildren();
  createjs.Ticker.removeAllListeners();
  stage.update();
}

function handleImageLoad(e) {
  startGame();
}

function startGame() {
  stage = new createjs.Stage(canvas);
  screen_width = canvas.width;
  screen_height = canvas.height;

  var spriteSheet = new createjs.SpriteSheet({
    images: [imgKarateWalk],
    frames: {width: 32, height: 32, regX: 16, regY: 16},
    animations: {
      walk: [0, 7, "walk", 4]
    }
  });

  // Flip animation to emulate walking the other way
  createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);

  bmpAnimation = new createjs.BitmapAnimation(spriteSheet);

  bmpAnimation.regX = bmpAnimation.spriteSheet.frameWidth/2|0;
  bmpAnimation.regY = bmpAnimation.spriteSheet.frameHeight/2|0;

  bmpAnimation.gotoAndPlay("walk");

  bmpAnimation.name = 'karate';
  bmpAnimation.direction = 90;
  bmpAnimation.vX = 0.3;
  bmpAnimation.x = 8;
  bmpAnimation.y = 16;

  bmpAnimation.currentFrame = 8;

  stage.addChild(bmpAnimation);

  createjs.Ticker.addListener(window);
  createjs.Ticker.useRAF = true;
  createjs.Ticker.setFPS(30);
}

function handleImageError(e) {
  console.log("Error Loading Image : " + e.target.src);
}

function tick() {
  if(bmpAnimation.x > screen_width - 8) {
    bmpAnimation.direction = -90;
    bmpAnimation.gotoAndPlay("walk_h");
  }

  if(bmpAnimation.x <= 8) {
    bmpAnimation.direction = 90;
    bmpAnimation.gotoAndPlay("walk");
  }

  if(bmpAnimation.direction == 90) {
    bmpAnimation.x += bmpAnimation.vX;
  } else {
    bmpAnimation.x -= bmpAnimation.vX;
  }

  stage.update();
}
