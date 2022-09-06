import {Game} from "./Observer/game_observer.js"
import {Clock} from "./Observer/clock_observer.js"
import {Observable, state} from "./Observable/observable.js"
import { Ball } from "./Components/ball.js";
import { ClockTick, BlowBrickCommand, Command, CommandList, MoveBallCommand, MovePaddle } from "./Command/command.js";
import {Paddle, leftRight} from "./Components/paddle.js";
import { Brick } from "./Components/brick.js";

var intervalId : any;
var wait = (ms: number) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}
function resume() {
    intervalId = setInterval(()=>{
        let cmdList : CommandList = new CommandList(gameCanvas);
        cmdList.commands = [];
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        obs.changeState(); // the ball position gets updated and it's redrawn
        /** collisions*/
		/** collision with paddle*/ 
		if(((ball.x + ball.radius) > paddle.x 
		&& ((ball.x-ball.radius/2) < (paddle.x+paddle.width)) 
			&& (ball.y + ball.radius/2 > paddle.y)))
		{
           ball.vy = -ball.vy;
		}
	
		/** collision with boundaries*/
		if((ball.x - ball.radius<=0) || ball.x >= gameCanvas.width)
			 ball.vx = -ball.vx;
		
		if((ball.y <= 0) || ball.y >= gameCanvas.height) ball.vy = -ball.vy;
		
		let brickBlown = -1;
        let oldBricks:Array<Brick> = [];
        bricks.forEach(brick => oldBricks.push(Object.create(brick)));
        let newBricks:Array<Brick> = [];
        bricks.forEach(brick => newBricks.push(Object.create(brick)));
		/** collision with brick wall*/
		for(let i = 0; i< bricks.length;i++)
		{
            
            if(ball.x >= bricks[i].left 
                && (ball.x <= (bricks[i].left+bricks[i].width))
                && ball.y >= bricks[i].top
                && ball.y <= (bricks[i].top+bricks[i].height)
            )
            {
                console.log("num bricks outside:");
                console.log(bricks.length);
                
                bricks.splice(i, 1);
                oldBricks.splice(1, 1);
                console.log(bricks.length);
                
                ball.vy = -ball.vy;
                
                break;
            }
           
		}
        let blowBrick = new BlowBrickCommand(oldBricks, newBricks);
        blowBrick.execute();  // draws the leftover bricks
        cmdList.commands.push(blowBrick);
        
        console.log('index ball x y')
        console.log(ball.x);
        console.log(ball.y);
        
        let move = new MoveBallCommand(new Ball(gameCanvas, ball.x, ball.y));
        move.execute();
        cmdList.commands.push(move);

        let ticker = new ClockTick(clock);
        ticker.execute();
        cmdList.commands.push(ticker)

        if(leftRightActions.length > 0){
            //console.log(leftRightActions);
            for (let c=0; c<leftRightActions.length; c++){
                if(leftRightActions[c]==leftRight.right && (paddle.x + paddle.width < gameCanvas.width))
                {
                    // console.log('right cmd');
                    paddle.x += paddle.vx;
                }
                else if(leftRightActions[c]==leftRight.left && (paddle.x >0)){
                    // console.log('left cmd');
                    paddle.x -= paddle.vx;
                }
                
            }
            leftRightActions = [];
        }
        let paddleMove = new MovePaddle(new Paddle(gameCanvas, paddle.x));
        paddleMove.execute();
        cmdList.commands.push(paddleMove);
        replayCommands.commands.push(cmdList);
    }, 100);
}
function computeBrickPositions(canvas:HTMLCanvasElement,
    left :number = 80, offset:number = 10,
     numRows :number = 8,
      numBricks:number = 25) :Array<Brick>{
   let bricks  : Array<Brick>= [];
   let colors : string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow'];
   for(let j:number =0;j<numRows;j++){
       let tmp_left = left;
       for(let i=0;i<numBricks;i++){
           let new_brick : Brick = new Brick(canvas);
           tmp_left = tmp_left+new_brick.width;
           
           new_brick.left = tmp_left;
           new_brick.top = offset;
           new_brick.color = colors[j];
           bricks.push(new_brick);
           }
           let tmp_brick = new Brick(canvas);
           offset = offset+tmp_brick.height+2;
       }
   return bricks;
   }
let leftRightActions:Array<leftRight> = [];
window.addEventListener('keydown', (e)=>
{
    switch(e.key){
        case "d": 
            leftRightActions.push(leftRight.right);
    	    break;
     	case "a": 
            leftRightActions.push(leftRight.left);
    	    break;

    	case "ArrowRight": 
            //console.log("move right");
            leftRightActions.push(leftRight.right);
    	    break;
    	case "ArrowLeft":
            //console.log("move left");
    	    leftRightActions.push(leftRight.left);
    	    break;
        }
});


document.getElementById("start").addEventListener('click', ()=>{
    clearInterval(intervalId);
    obs.detach(ball);
    obs.detach(paddle);
    obs.detach(clock)
    replayCommands.commands = [];
    ball = new Ball(gameCanvas, gameCanvas.width/2, gameCanvas.height/2);
    paddle = new Paddle(gameCanvas, gameCanvas.width/2);
    clock = new Clock(clockCanvas);
    bricks = computeBrickPositions(gameCanvas);
    bricks.forEach(brick => brick.draw());
    obs.attach(clock)
    obs.attach(ball);
    obs.attach(paddle);
    resume();
   
    
});
document.getElementById("pause").addEventListener('click', ()=>{
    if (intervalId) {
        console.log("pause clicked");
        clearInterval(intervalId);
    }
});
document.getElementById("resume").addEventListener('click', ()=>{
    clearInterval(intervalId);
    resume();
});
document.getElementById("undo").addEventListener('click', ()=>{
    
    //paddle.draw();
    // let tempBall: Ball = Object.create(ball);
    // let tempBricks: Array<Brick> = Object.create(bricks);
    // let tempPaddle: Paddle = Object.create(paddle);
    // let tempClock: Clock = Object.create(clock);
    if(replayCommands.commands.length > 0){
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        replayCommands.commands.pop().undo();
    }
    
 
});
document.getElementById("redo").addEventListener('click', ()=>{
    
    //paddle.draw();
    // let tempBall: Ball = Object.create(ball);
    // let tempBricks: Array<Brick> = Object.create(bricks);
    // let tempPaddle: Paddle = Object.create(paddle);
    // let tempClock: Clock = Object.create(clock);
    if(replayCommands.commands.length > 0){
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        replayCommands.commands.pop().undo();
    }
    
 
});
document.getElementById("replay").addEventListener('click', ()=>{
    // console.log('commands:');
    // console.log(commands);
    
    replayCommands.execute();
});

let gameCanvas : HTMLCanvasElement  = document.getElementById('game-canvas') as HTMLCanvasElement;
let clockCanvas : HTMLCanvasElement  = document.getElementById('clock-canvas') as HTMLCanvasElement;
let clock : Clock = new Clock(clockCanvas);

let ball : Ball = new Ball(gameCanvas, gameCanvas.width/2, gameCanvas.height/2);
let paddle : Paddle = new Paddle(gameCanvas, gameCanvas.width/2);

let bricks:Array<Brick> = computeBrickPositions(gameCanvas);
bricks.forEach(brick => brick.draw());


let replayCommands: CommandList  = new CommandList(gameCanvas);

//let ballCommands : Array<Command> = [];
//let paddleCommands :Array<Command> = [];

let obs: Observable = new Observable();
ball.draw();
paddle.draw();
//let blowBrickCommands : Array<Command> = [];

clock.draw();
//obs.changeState(); // initial drawing


//obs.attach(ball);
// 1st method of changing state - time units
//setInterval(()=>obs.changeState(gameState), 100);
// 2nd method of changing state - when mouse is held down
//gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.changeState(gameState));
