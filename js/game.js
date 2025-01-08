class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 750;
        this.ratio = this.height / this.baseHeight;
        this.player = new Player(this);
        this.gravity;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', (e) => {
            console.log(e);
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        });

        window.addEventListener('mousedown',e =>{
            this.player.flap();
            
        });

        this.canvas.addEventListener('touchstart',e =>{
            this.player.flap();
        });
    }

    resize(width,height)    {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx.fillStyle = '#FFC0CB'
        this.ratio = this.height / this.baseHeight;

        this.gravity = 0.15 * this.ratio;   
        this.background.resize();
        this.player.resize();
    }

    render(){
        this.player.update();
        this.player.draw();
    }
}



    
window.addEventListener('load', function(){
    const canvas = this.document.getElementById('game-layout')
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);
    function animate () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
        requestAnimationFrame(animate);
    }

    this.requestAnimationFrame(animate);
});