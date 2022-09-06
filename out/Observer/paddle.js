export var leftRight;
(function (leftRight) {
    leftRight[leftRight["left"] = 0] = "left";
    leftRight[leftRight["right"] = 1] = "right";
    leftRight[leftRight["none"] = 2] = "none";
})(leftRight || (leftRight = {}));
export class Paddle {
    constructor(canvas, x) {
        this.canvas = canvas;
        this.x = x;
        this.y = canvas.height - (canvas.height / 20);
        this.width = 80;
        this.height = 10;
        this.vx = 10;
    }
    ;
    moveLeft() {
        if (this.x > 0)
            this.x -= this.vx;
    }
    moveRight() {
        if ((this.x + this.width) < this.canvas.width)
            this.x += this.vx;
    }
    update() {
        this.draw();
    }
    draw() {
        let ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
