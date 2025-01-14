class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.background = new Background(this);
        this.player = new Player(this);
        this.obstacles = [];
        this.numberOfObstacles = 10;
        this.gravity;
        this.speed;
        this.score;
        this.gameOver;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        });

        // Mouse controls
        this.canvas.addEventListener('mousedown', e => {
            this.player.flap();
        });

        // Keyboard controls
        window.addEventListener('keydown', e => {
            if ((e.key === ' ') || (e.key === 'Enter')) {
                this.player.flap();
            }
        });

        // Touch controls
        this.canvas.addEventListener('touchstart', e => {
            this.player.flap();
        });
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx.fillStyle = '#5995F2';
        this.ctx.font = '40px Playfair';
        this.ctx.textAlign = 'right';
        this.ratio = this.height / this.baseHeight;

        this.gravity = 0.15 * this.ratio;
        this.speed = 3 * this.ratio;
        this.background.resize();
        this.player.resize();
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        });

        this.score = 0;
        this.gameOver = false;
    }

    render() {
        if (this.gameOver) return;

        this.background.update();
        this.background.draw();
        this.player.update();
        this.drawStatusText();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
            obstacle.update();
            obstacle.draw();
        });

        this.checkCollision();
    }

    createObstacles() {
        this.obstacles = [];
        const firstX = this.baseHeight * this.ratio;
        const obstacleSpacing = 600 * this.ratio;

        for (let i = 0; i < this.numberOfObstacles; i++) {
            this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
        }
    }

    drawStatusText() {
        this.ctx.save();
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText('Score: ' + this.score, this.width - 10, 30);
        this.ctx.restore();
    }

    checkCollision() {
        const playerBox = {
            x: this.player.x,
            y: this.player.y,
            width: this.player.width,
            height: this.player.height
        };

        for (let obstacle of this.obstacles) {
            const obstacleBox = {
                x: obstacle.x,
                y: obstacle.y,
                width: obstacle.width,
                height: obstacle.height
            };

            if (
                playerBox.x < obstacleBox.x + obstacleBox.width &&
                playerBox.x + playerBox.width > obstacleBox.x &&
                playerBox.y < obstacleBox.y + obstacleBox.height &&
                playerBox.y + playerBox.height > obstacleBox.y
            ) {
                this.gameOver = true;
                return;
            }
        }
    }
}

window.addEventListener('load', function () {
    const canvas = document.getElementById('game-layout');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
        if (!game.gameOver) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});
