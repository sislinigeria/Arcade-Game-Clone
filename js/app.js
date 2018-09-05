// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter within the x axis
    this.x += this.speed * dt;
    // which will ensure the game runs at the same speed for
    // all computers.

    //When the enemy moves out of the canvas, reset it to 
    //move across again
    if(this.x > 511) {
        this.x = -50;
        //Continue the movement across the screen and randomise the speed
        this.speed = 100 + Math.floor(Math.random() * 222);
    }

    //While moving across the enemy area of the screen, check for collision
    //between the enemies and the player
    if(player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
            player.x = 202;
            player.y = 405;
        };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    //add picture of princess girl into the canvas.
    this.player = 'images/char-princess-girl.png';
};

// This class requires an update(), render() and
Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// a handleInput() method.
//users can use the arrow keys to move around in the canvas left, right, up and down
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }
    //reset back to the starting position ones the player reaches the top of the canvas
    if (this.y < 0) {
        setTimeout(function () {
            player.x = 202;
            player.y = 405;
        }, 800);
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

//Location of the enemy
var enemyLocation = [63, 147, 230];

//In each of the enemy location move at the speed of 200 until randomly re-assigned
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});
// Place the player object in a variable called player
var player = new Player (202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
