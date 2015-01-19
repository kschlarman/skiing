var Player = function(game) {
  this.game = game;
  this.center = { x: game.size.x / 2, y: 50 };
  this.keyboarder = new Keyboarder();

  this.skierDown = new Image();
  this.skierDown.src = 'skier_down.gif';
  this.skierLeft = new Image();
  this.skierLeft.src = 'skier_left.gif';
  this.skierRight = new Image();
  this.skierRight.src = 'skier_right.gif';
  this.skier = this.skierDown;

  this.sizeDown = { x: 35, y: 50 };
  this.sizeSide = { x: 50, y: 50 };
  this.size = this.sizeDown;
};

Player.prototype = {
  update: function() {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.skier = this.skierLeft;
      this.size = this.sizeSide;
      this.game.updateTerrainVelocity('left');
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.skier = this.skierRight;
      this.size = this.sizeSide;
      this.game.updateTerrainVelocity('right');
    } else {
      this.skier = this.skierDown;
      this.size = this.sizeDown;
      this.game.updateTerrainVelocity('down');
    };
  },

  draw: function() {
    var playerX = this.center.x - this.size.x / 2; 
    var playerY = this.center.y - this.size.y / 2;

    this.game.screen.drawImage(this.skier, playerX, playerY, this.size.x, this.size.y);
  }
};

