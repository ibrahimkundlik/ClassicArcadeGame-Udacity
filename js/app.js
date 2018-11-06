const message = document.querySelector(".popup");
const restart = document.querySelector(".button");

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move again
    if (this.x > 600) {
        this.x = -100;
        this.speed = 99 * Math.floor(Math.random() * 5 + 2);
    }

    // Check for collision between player and enemies
    if ((player.x < this.x + 50) && (player.x > this.x - 50) && (player.y < this.y + 30) && (this.y - 30 < player.y)) {
        player.x = 200;
        player.y = 405;
        message.innerText = 'Try Again!!!';
    }

    // Stopping the enemies after player has reached water part
    if (player.y < 0) {
        this.x = this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
var Player = function Player(x, y) {
    this.x = x;
    this.y = y;
    this.h_step = 101;
    this.v_step = 83;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 405) {
        this.y = 405;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching the water part and winning the game
    if (this.y < 0) {
        player.stopGame();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.h_step;
            break;
        case 'up':
            this.y -= this.v_step;
            break;
        case 'right':
            this.x += this.h_step;
            break;
        case 'down':
            this.y += this.v_step;
            break;
    }
};

Player.prototype.stopGame = function() {
    this.h_step = 0;
    this.v_step = 0;
    message.innerText = 'You won the game.';
    restart.style.display = "inline-block";
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPosition = [65, 145, 225];
var player = new Player(200, 405);
var enemy;
enemyPosition.forEach(function(yPos) {
    enemy = new Enemy(0, yPos, 99 * Math.floor(Math.random() * 5 + 2));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Restart the game.
restart.addEventListener("click", function() {
    playAgain();
    //console.log("key press");
});
const playAgain = function() {
    player.x = 200;
    player.y = 405;
    player.h_step = 101;
    player.v_step = 83;
    restart.style.display = "none";
    message.innerText = '';
    Engine;
};
