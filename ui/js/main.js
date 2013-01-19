var canvas;
var stage;
var screen_width;
var screen_height;
var bmpAnimation;

var KEYCODE_SPACE = 32;
var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;

var imgKarateWalk = new Image();

var jumpHeight = 0; // Current height in px of jump
var jumping = false; // Is the player jumping
var onSurface = true; // Is the player on a surface

var map1 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], 
  [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0], 
  [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
  [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
];

function init() {
  canvas = document.getElementById("game");
  canvas.height = 384;
  canvas.width = 640;
  canvas.style.height = 384;
  canvas.style.width = 640;
  canvas.style['background-color'] = '#000000';

  imgKarateWalk.onload = handleImageLoad;
  imgKarateWalk.onerror = handleImageError;
  imgKarateWalk.src = "img/karate-walk-spritesheet.png";
}

function reset() {
  if(stage) {
    stage.removeAllChildren();
    createjs.Ticker.removeAllListeners();
    stage.update();
    return true;
  } else {
    return false;
  }
}

function handleImageLoad(e) {
  startGame();
}

function startGame() {
  stage = new createjs.Stage(canvas);
  screen_width = canvas.width;
  screen_height = canvas.height;

  drawMap();

  var spriteSheet = new createjs.SpriteSheet({
    images: [imgKarateWalk],
    frames: {width: 32, height: 32, regX: 16, regY: 16},
    animations: {
      walk: [0, 7, "walk", 8]
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
  bmpAnimation.vX = 1;
  bmpAnimation.x = 8;
  bmpAnimation.y = 336;

  bmpAnimation.currentFrame = 8;

  stage.addChild(bmpAnimation);

  document.onkeydown = function(e) {
    handleKeyDown(e);
  }

  document.onkeyup = function(e) {
    handleKeyUp(e);
  }

  createjs.Ticker.addListener(window);
  createjs.Ticker.useRAF = true;
  createjs.Ticker.setFPS(30);
}

function handleKeyDown(e) {
  if(!e) { var e = window.event; }
  switch(e.keyCode) {
    case KEYCODE_A: ;
    case KEYCODE_LEFT:
      // move left
      bmpAnimation.direction = -90;
      bmpAnimation.gotoAndPlay("walk_h");
      break;
    case KEYCODE_D: ;
    case KEYCODE_RIGHT:
      // move right
      bmpAnimation.direction = 90;
      bmpAnimation.gotoAndPlay("walk");
      break;
    case KEYCODE_W: ;
    case KEYCODE_UP:
      // jump
      if(!jumping) {
        jumping = true;
      }
      break;
  }
}

function handleKeyUp(e) {
  //cross browser issues exist
  if (!e) { var e = window.event; }
  switch (e.keyCode) {
    case KEYCODE_A: ;
    case KEYCODE_LEFT: ;
    case KEYCODE_D: ;
    case KEYCODE_RIGHT:
      // stop moving
      break;
    case KEYCODE_W: ;
    case KEYCODE_UP:
      // stop jumping
      jumping = false;
      break;
  }
};

function drawMap() {
  var g = new createjs.Graphics();
  g.setStrokeStyle(1);
  g.beginStroke(createjs.Graphics.getRGB(255,255,255));
  g.beginFill(createjs.Graphics.getRGB(50,50,50));
  g.drawRect(0, 0, 16, 16);
  var block = new createjs.Shape(g);

  var g = new createjs.Graphics();
  g.setStrokeStyle(1);
  g.beginStroke(createjs.Graphics.getRGB(255,255,0));
  g.beginFill(createjs.Graphics.getRGB(255,0,0));
  g.drawRect(0, 0, 16, 16);
  var door = new createjs.Shape(g);

  for(var x = 0; x <= 39; x++) {
    for(var y = 0; y <= 23; y++) {
      if(map1[y][x] == 1) {
        drawShape(x, y, block);
      } else if (map1[y][x] == 2) {
        drawShape(x, y, door);
      }
    }
  }
  stage.update();
}

function drawShape(x, y, base) {
  s = base.clone();
  s.x = x * 16;
  s.y = y * 16;
  stage.addChild(s);
}

function handleImageError(e) {
  console.log("Error Loading Image : " + e.target.src);
}

function updateOnSurface() {
  var under = stage.getObjectUnderPoint(bmpAnimation.x, bmpAnimation.y + 17);

  if(under) {
    onSurface = true;
  } else {
    onSurface = false;
  }
}

function tick() {
  updateOnSurface();

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

  if(jumping) {
    if(jumpHeight < 72) {
      bmpAnimation.y = bmpAnimation.y - 4;
      jumpHeight = jumpHeight + 4;
    } else {
      jumping = false;
      jumpHeight = 0;
    }
  } else {
    if(onSurface) {
    } else {
      bmpAnimation.y = bmpAnimation.y + 4;
    }
  }

  stage.update();
}
