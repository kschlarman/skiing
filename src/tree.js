var Tree = function(game, x, y) {
  this.game = game;
  this.size = { x: 30, y: 70 };
  this.center = { x: x, y: y };

  this.tree = new Image();
  this.tree.src = './img/tree.gif'; 
};

Tree.prototype = {
  update: function() {
    var velocity = this.game.terrainVelocity;
    this.center = { x: this.center.x + velocity.x, y: this.center.y + velocity.y }
  },

  draw: function() {
    var treeX = this.center.x - this.size.x / 2; 
    var treeY = this.center.y - this.size.y / 2;

    this.game.screen.drawImage(this.tree, treeX, treeY, this.size.x, this.size.y);
  }
};

