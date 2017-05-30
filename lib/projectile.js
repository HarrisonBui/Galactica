const Util = require("./util.js");
const Ship = require("./ship.js")

class Projectile {
  constructor(options) {
    this.xVel = options.xVel;
    this.yVel = options.yVel;
    this.stage = options.stage;
    this.enemy = options.enemy;
    this.shot = new createjs.Shape();
    this.drawProjectile(options.color)
    this.shot.x = options.x;
    this.shot.y = options.y;
    this.game = options.game;

    setTimeout(() => {
      this.stage.addChild(this.shot);
      if (this.enemy) {
        this.game.enemyProjectiles.push(this)
      } else {
        this.game.projectiles.push(this);
      }
    }, 10);

  }

    drawProjectile(color) {
    if (this.enemy) {
      this.shot.graphics.beginFill(color).drawCircle(0, 0, 4);
    } else {
      this.shot.graphics.beginFill(color).drawRect(0, 0, 3, 7);
    }
  }

    move(deltaS) {
    this.shot.y += (deltaS * this.yVel);
    this.shot.x += (deltaS * this.xVel);

    if (this.shot.y < -20 || this.shot.y > 720) {
      this.stage.removeChild(this.shot);
      if (this.enemy) {
        const idx = this.game.enemyProjectiles.indexOf(this);
        this.game.enemyProjectiles.splice(idx, 1);
      } else {
        this.game.projectiles.shift();
      }
    }
  }


}

  module.exports = Projectile;
