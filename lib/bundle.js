/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Projectile = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./projectile.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

class Ship {
  constructor(game) {

    this.stage = game.stage;
    this.game = game;

    this.keyLeft = false;
    this.keyRight = false;
    this.keyUp = false;
    this.keyDown = false;
    this.keySpace = false;
    this.radius = 20;

    this.ship;

    this.move = this.move.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    this.manifest = [
      {src: "./assets/ship.png", id: "ship"}
    ];

    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "../assets/ship/");

  }

  handleComplete() {
    const shipImage = this.loader.getResult("ship");

    this.ship = new createjs.Shape();
    this.ship.graphics.beginBitmapFill(shipImage, "no-repeat").drawRect(0, 0, 64, 64);
    this.ship.regX = -10;
    this.ship.regY = 25;
    this.ship.x = 350;
    this.ship.y = 600;
    this.ship.setBounds(0, 0, 700, 700);

    setTimeout(() => {
      this.stage.addChild(this.ship);
    }, 500)

    setInterval(this.move, 3);

    setInterval(() => {
      this.shoot()
    }, 100)

  }

  setDirection(keyCode, boolean) {
    switch (keyCode) {
      case 37:
        this.keyLeft = boolean;
        break
      case 39:
        this.keyRight = boolean;
        break
      case 38:
        this.keyUp = boolean;
        break
      case 40:
        this.keyDown = boolean;
        break
      case 32:
        this.keySpace = boolean;
        break
      default:
        break
    }
  }

  move() {
    if (this.keyLeft && this.ship.x - 2 > -15) this.ship.x -= 2;
    if (this.keyRight && this.ship.x + 2 < 650) this.ship.x += 2;
    if (this.keyUp && this.ship.y - 2 > 20) this.ship.y -= 2;
    if (this.keyDown && this.ship.y + 2 < 680) this.ship.y += 2;
  }

  shoot() {
    let projectile;
    if (this.keySpace) {
      projectile = new Projectile({
        x: this.ship.x + 41,
        y: this.ship.y,
        xVel: 0,
        yVel: -500,
        color: "DeepSkyBlue",
        stage: this.stage,
        enemy: false,
        game: this.game
      });
    }
    if (projectile) return projectile;
  }


}

module.exports = Ship;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(0)

class Background {
  constructor(stage) {
    this.stage = stage;
    this.space;
    this.space2;

    this.manifest = [
      {src: "./assets/space.gif", id: "space"}
    ];

    this.handleComplete = this.handleComplete.bind(this);
    this.move = this.move.bind(this);

    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "../assets/art/");

  }


  handleComplete() {

    let spaceBackground = this.loader.getResult("space");
    this.space = new createjs.Shape();
    this.space.graphics.beginBitmapFill(spaceBackground).drawRect(0, 0, 700, 700);
    this.space.y = 0;
    this.space.scaleX = 2.18;
    this.space.scaleY = 2.18;

    this.space2 = new createjs.Shape();
    this.space2.graphics.beginBitmapFill(spaceBackground).drawRect(0, 0, 700, 700);
    this.space2.scaleY = 2.18;
    this.space2.scaleX = 2.18;

    this.space2.y = -699;
    this.stage.addChild(this.space2, this.space);

  }

  move(deltaS) {

    this.space.y = (this.space.y + deltaS * 100) % 700;
    this.space2.y = this.space.y - 699;
  }


}

module.exports = Background;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Background = __webpack_require__(1);
const Ship = __webpack_require__(0);
const Enemy = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./enemy.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map