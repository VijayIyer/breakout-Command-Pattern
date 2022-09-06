export class ClockTick {
    constructor(clock) {
        this.clock = clock;
        this.time = 0;
    }
    execute() {
        this.time = this.clock.time;
        this.clock.draw();
    }
    undo() {
        this.clock.time = this.time;
        this.clock.draw();
    }
}
export class MoveBallCommand {
    constructor(ball) {
        this.ball = ball;
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
    }
    execute() {
        //console.log(this.ball.x+" "+this.ball.y);
        this.x = this.ball.x;
        this.y = this.ball.y;
        // console.log('moveballcmd execute');
        // console.log(this.x);
        this.ball.draw();
    }
    undo() {
        this.ball.x = this.x;
        this.ball.y = this.y;
        this.ball.draw();
    }
}
export class CommandList {
    constructor(canvas) {
        this.canvas = canvas;
        this.commands = [];
        this.speed = 500;
    }
    // replays the stored commands
    execute() {
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.commands.forEach(function (cmd, index) {
            setTimeout(() => cmd.execute()
            // do whatever
            , 100 * (index + 1));
        });
    }
    undo() {
        this.commands.forEach(cmd => cmd.undo());
    }
}
export class MovePaddle {
    constructor(paddle) {
        this.paddle = paddle;
        this.x = this.paddle.x;
        this.vx = this.paddle.vx;
    }
    execute() {
        this.x = this.paddle.x;
        this.paddle.draw();
    }
    undo() {
        this.paddle.x = this.x;
        this.paddle.draw();
    }
}
export class BlowBrickCommand {
    constructor(oldBricks, newBricks) {
        this.oldBricks = oldBricks;
        this.newBricks = newBricks;
    }
    execute() {
        this.oldBricks.forEach(brick => brick.draw());
    }
    undo() {
        this.newBricks.forEach(brick => brick.draw());
    }
}
