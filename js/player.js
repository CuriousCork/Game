class Player {
    constructor(game) {
        this.game = game;
        this.x = 20;
        this.y = 0;
        this.spritewidth = 200;
        this.spriteheight = 200;
        this.width;
        this.height;
        this.speedY;
        this.jump;
        this.flapspeed; 
    }

    draw() {
        this.game.ctx.fillRect (this.x, this.y, this.width, this.height);
    }
    
    update() {
        this.y += this.speedY;

        if(this.isTouchingBottom()) {
            this.y = this.game.height - this.height;
        }
        else {
            this.speedY += this.game.gravity;
        }
    }


    resize() {
        this.width = this.spritewidth * this.game.ratio;
        this.height = this.spriteheight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height  * 0.5;
        this.speedY = -8 * this.game.ratio;
        this.flapSpeed = 6 *this.game.ratio;
    }

    isTouchingBottom(){
        return this.y >= this.game.height - this.height;
    }

    isTouchingTop(){
        return this.y <= 0;
    }

   

    flap() {
        if(!this.isTouchingTop()) {
        this.speedY = -this.flapSpeed;
        }
    }

    
}