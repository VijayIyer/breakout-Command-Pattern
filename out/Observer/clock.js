export class Clock {
    constructor(canvas) {
        this.canvas = canvas;
        this.time = 0;
    }
    ;
    update() {
        this.time += 1;
    }
    draw() {
        let secs = (this.time / 10);
        let ctx = this.canvas.getContext('2d');
        let h = Math.floor(secs / 3600);
        let m = Math.floor(secs % 3600 / 60);
        let s = Math.floor(secs % 3600 % 60);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.font = "20px Arial";
        ctx.fillText(h + ":" + m + ":" + s, 0, this.canvas.height / 2);
    }
}
