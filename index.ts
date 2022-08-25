interface Sprite{
    update(): void;
    draw(context: Context);
}

interface Context{

};
class Observable{
    
    tick() :void{
        
        this.sprites.forEach((spr:Sprite) => spr.update());
    }
    private sprites: Array<Sprite> = [];
    attach(sprite: Sprite): void{
        this.sprites.push(sprite);
    }
    detach(sprite: Sprite): void{
        this.sprites.splice(this.sprites.indexOf(sprite), 1);
    }
}
class ballObserver implements Sprite{
    content: HTMLElement;
    constructor(){
        this.content = document.createElement('div');
        this.content.setAttribute('id', 'ball');
        this.content.setAttribute('class', 'ball');
        this.content.setAttribute('left-right', 'left');
        this.content.setAttribute('up-down', 'down');
    }
    update(): void {
        let rect:any = this.content.getBoundingClientRect();
        if(this.content.getAttribute('left-right') === 'left') {
            this.content.style.left = (rect.x - 3) + 'px';
        }
        if(this.content.getAttribute('left-right') === 'right') {
            this.content.style.left = (rect.x + 3) + 'px';
        }
        if(this.content.getAttribute('up-down') === 'up') {
            this.content.style.top = (rect.y - 3) + 'px';
        }
        if(this.content.getAttribute('up-down') === 'down') {
            this.content.style.top = (rect.y + 3) + 'px';
        }

    }
    draw():void{

    }
};
class clockObserver implements Sprite{
    private mins:string = "00";
    private secs:string = "00";
    private hours:string = "00";
    private time:string = "0";
    content : HTMLElement;
    constructor(){
        this.content = document.createElement('div');
        this.content.classList.add('clock');
        
        this.content.innerHTML = "0";
    }
    update():void{
        let time:any = parseInt(this.time);
        time += 1;
        this.time = time.toString();
        // this.secs = (parseInt(this.time)/10).toString();
        // this.mins = (parseInt(this.secs)/60).toString();
        this.content.innerHTML = this.time;
    }
    draw(context: Context):void {
        
    }
}

function pause(observable:Observable, sprite:Sprite) : any{
    observable.detach(sprite);
}
function createPauseButton(name:string){
 let button = document.createElement('button');
 button.innerHTML = name;
 button.setAttribute("id", "button");
 button.classList.add("button");

 document.getElementById("board").appendChild(button);
}
function init() :void
{
let numBricks = 0;
  let left = 20;
  let width = 20;
  let height = 10;
  let top = 0;
  
  createWall(20,  numBricks, top, left, width, height, 'red');
  top += height + 5;
  numBricks += 20;
  
  createWall(20,  numBricks, top, left, width, height, 'red');
  top += height + 5;
  numBricks += 20;
  
  
  
  createWall(20,  numBricks, top, left, width, height, 'orange');
  top += height + 5;
  numBricks += 20;
  createWall(20,  numBricks, top, left, width, height, 'orange');
  top += height + 5;
  numBricks += 20;
  
  createWall(20,  numBricks , top, left, width, height, 'green');
  top += height + 5;
  numBricks += 20;
  createWall(20,  numBricks , top, left, width, height, 'green');
  top += height + 5;
  numBricks += 20;
  
  createWall(20,  numBricks , top, left, width, height, 'yellow');
  top += height + 5;
  numBricks += 20;
  createWall(20,  numBricks , top, left, width, height, 'yellow');
  top += height + 5;
  numBricks += 20;
    
 
  createPaddle();
  createBase();
  createPauseButton("pause game");
}
function createPaddle() :void
{
   
   let board = document.getElementById('board');
   let paddle = document.createElement('div');
   paddle.setAttribute("id", "paddle");
   paddle.classList.add("paddle");
   board.appendChild(paddle); 

}
function createBox(brickNumber : number, top : number, left : number,
    width:number, height:number, color:string) : void
{
 // console.log(top);
  let board = document.getElementById('board');
  let box = document.createElement('div');
  box.setAttribute('id', 'box'+brickNumber);
  box.classList.add("box");
  box.style.position = 'absolute';
  box.style.left = left+'px';
  box.style.top = top+'px';
  box.style.height = height+'px';
  box.style.width = width+'px';
  box.style.setProperty('background-color',color);
  board.appendChild(box);
   
}
function createWall(numBricks, numBricksBuilt, top, left, width, height, color)
{
	let left_temp = left;
	for (let i = 0; i < numBricks; i++) {
	  
	  createBox(numBricksBuilt + i, top, left_temp, width, height, color);
	  
	  left_temp += width+2;
	}
    
}

function createBase()
{
    let board = document.getElementById('board');
    let base = document.createElement('div');
    base.setAttribute('id', 'base');
    base.classList.add('base');

    board.appendChild(base);
}


window.addEventListener('load', init);
const observable = new Observable();
const ball: ballObserver = new ballObserver();
document.getElementById('board').appendChild(ball.content);
observable.attach(ball);
const clock = new clockObserver();
document.getElementById('board').appendChild(clock.content);
observable.attach(clock);
// document.getElementById("button").addEventListener('click', 
// (evt : CustomEvent)=>
// {
//     console.log("pause game");
// }, false);
setInterval(function(){
    observable.tick();
}, 100);