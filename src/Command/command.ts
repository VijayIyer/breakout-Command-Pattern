import { Ball } from "../Components/ball.js";
import { Brick } from "../Components/brick.js";
import { Paddle } from "../Components/paddle.js";
import {Sprite} from "../Observer/observer.js";
import { leftRight } from "../Components/paddle.js";
import { Clock } from "../Observer/clock_observer.js";

// export enum commandTypes {
//     Ball,
//     Paddle,
//     Brick,
//     Clock
// }

export interface Command{
    execute() : void;
    undo(): void;
    
}


export class ClockTick implements Command{
    private time: number;
    
    constructor(private clock:Clock){
        this.time = 0;
    
    }
    execute():void{
        
        this.time = this.clock.time;
        this.clock.draw();
    }
    undo():void{
        this.clock.time = this.time;
        this.clock.draw();
    }

}
export class MoveBallCommand implements Command{
    private x:number;
    private y:number;
    private vx:number;
    private vy:number;
    

    constructor(private readonly ball : Ball){
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
        
    }
    execute():void{
        
        //console.log(this.ball.x+" "+this.ball.y);
        this.x = this.ball.x;
        this.y = this.ball.y;
        // console.log('moveballcmd execute');
        // console.log(this.x);
        this.ball.draw();
    }
    undo():void{
        
        this.ball.x = this.x;
        this.ball.y = this.y;
        this.ball.draw();
    }

   
}
export class CommandList implements Command{
    constructor(private canvas:HTMLCanvasElement){
        this.commands = [];
        this.speed = 500;
    }
    
    commands : Array<Command>;
    speed : number;
    // replays the stored commands
    execute(): void {
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.commands.forEach(function(cmd, index) {
            setTimeout(()=>cmd.execute()
              // do whatever
            , 100 * (index + 1));
        });
    }
    undo(): void {
        this.commands.forEach(cmd=>cmd.undo());
    }
}
export class MovePaddle{
    private x:number;
    private y:number;
    private vx:number;
    

    constructor(private paddle:Paddle){
        this.x = this.paddle.x;
        this.vx = this.paddle.vx;
        
    }
    execute():void{
        
        this.x = this.paddle.x;
        this.paddle.draw();
        
    }
    undo():void{
        this.paddle.x = this.x;
        this.paddle.draw();
    }

  
}
export class BlowBrickCommand{
    
  
    private blownBrick:Brick;
    constructor(private readonly oldBricks:Array<Brick>, private readonly newBricks:Array<Brick>){
        
  
    }
   execute():void{
       
        this.oldBricks.forEach(brick => brick.draw());
        
    }
    undo():void{
        
        this.newBricks.forEach(brick => brick.draw());
    }

    
}