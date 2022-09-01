export class Brick {
    constructor(canvas) {
        this.color = 'yellow';
        this.left = 0;
        this.top = 0;
        this.width = 30;
        this.height = 10;
        this.ctx = canvas.getContext('2d');
    }
    update() {
        this.draw(this.ctx);
    }
    draw(ctx) {
        this.drawBorder(ctx, this.left, this.top, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.left, this.top, this.width, this.height);
    }
    drawBorder(ctx, xPos, yPos, width, height, thickness = 2) {
        ctx.fillStyle = '#000';
        ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
    }
}
