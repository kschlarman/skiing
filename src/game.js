;(function() {
  var Game = function(canvas) {
    var canvas = document.getElementById(canvas);

    this.screen = canvas.getContext('2d');
    this.size = { x: canvas.width, y: canvas.height };
    this.bodies = this.fillTerrain().concat(new Player(this));

    this.terrainVelocities = {
      right: { x: -1, y: -1 },
      left: { x: 1, y: -1 },
      down: { x: 0, y: -1}
    };

    this.terrainVelocity = this.terrainVelocities.down;

    var self = this;
    var tick = function() {
      self.update();
      self.draw();
      requestAnimationFrame(tick);
    };

    tick();
  };

  Game.prototype = {
    update: function() {
      var self = this;
      this.removeHiddenBodies();

      var notCollidingWithAnything = function(b1) {
        return self.bodies.filter(function(b2) { return colliding(b1, b2); }).length === 0;
      };

      this.bodies = this.bodies.filter(notCollidingWithAnything);

      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].update();
      }
    },

    draw: function() {
      this.screen.clearRect(0, 0, this.size.x, this.size.y);
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].draw();
      }
    },

    updateTerrainVelocity: function(direction) {
      this.terrainVelocity = this.terrainVelocities[direction];
    },

    fillTerrain: function() {
      var terrain = [];
      var terrainStart = 100;
      for (var i = 0; i < 20; i++) {
        var x = Math.random() * this.size.x;
        var y = (Math.random() * 1000) + terrainStart;
        terrain.push(new Tree(this, x, y));
      }
      return terrain;
    },

    removeHiddenBodies: function() {
      this.bodies = this.bodies.filter(function(body) {
        return body.center.y + body.size.y / 2 > 0;
      }); 
    }
  };

  var colliding = function(b1, b2) {
    return !(
      b1 === b2 ||
        b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
    );
  };

  window.onload = function() {
    new Game("screen");
  };
 })()
