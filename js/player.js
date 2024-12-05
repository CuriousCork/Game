class Player {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.spritewidth = 200;
        this.spriteheight = 200;
        this.width;
        this.height; 
    }

    draw() {
        this.game.ctx.fillRect (this.x, this.y, this.width, this.height);
    }
    
    update() {
        //this.x++;
    }


    resize() {
        this.width = this.spritewidth * this.game.ratio;
        this.height = this.spriteheight * this.game.ratio;
    }
}