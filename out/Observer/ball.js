export class Ball {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.vx = 4;
        this.vy = 10;
        this.radius = 10;
        this.color = 'blue';
    }
    update() {
        console.log('ball update x y');
        console.log(this.x);
        console.log(this.y);
        this.x += this.vx;
        this.y += this.vy;
    }
    draw() {
        // console.log('ball draw x and y and canvas x y:');
        // console.log(this.x);
        // console.log(this.y);
        // console.log(this.canvas.height);
        // console.log(this.canvas.width);
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
;
