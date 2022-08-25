/*
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
function createPaddle() :void
{
   
   let board = document.getElementById('board');
   let paddle = document.createElement('div');
   paddle.setAttribute("id", "paddle");
   paddle.classList.add("paddle");
   board.appendChild(paddle); 

}
function createBall() : void
{
  let board = document.getElementById('board');
   let ball = document.createElement('div');
   ball.setAttribute("id", "ball");
   ball.classList.add("ball");
   ball.setAttribute('up-down', 'down');
   ball.setAttribute('left-right', 'left');

   board.appendChild(ball); 
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

// creates all objects
function init()
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
    
  createBall();
  createPaddle();
  createBase();
}

function movePaddle(e:KeyboardEvent)
{
    let box = document.getElementById('paddle');
    box.style.position=  'absolute';
    let pos = box.getBoundingClientRect();
    //console.log(pos); 
	console.log(e.key);
    if(e.key === "left" && (pos.x > 0)) {

	box.style.left = (pos.x - sensitivity)+'px';
	   
	}

    else if(e.key === "right"  && (pos.x < 400)) {
     
     box.style.left = (pos.x + sensitivity)+'px';
    }

}
function ballMovement()
{
    	let paddle = document.getElementById('paddle');
	let ball = document.getElementById('ball');	
	let ball_pos = ball.getBoundingClientRect();
	let paddle_pos = paddle.getBoundingClientRect();
	let base = document.getElementById('base');
	let base_top = base.getBoundingClientRect().top;
	
	let bricks = document.querySelectorAll('.box');
		
	// changing direction logic
	// collision with bricks
	
	for(let i = 0; i < bricks.length; i++)
	{
		
	   let brick_pos = bricks[i].getBoundingClientRect();
	   if(ball_pos.top <= brick_pos.bottom && ball_pos.right > brick_pos.left && ball_pos.left < brick_pos.right )
	   {
	   console.log(i);
	    //let bricks_temp = document.getElementsByClassName('box');
	    bricks[i].remove();
	   
	    numHits += 1;
	    if(numHits == 4)
	       {
	           clearInterval(intervalId);
	           intervalId = startInterval(speed/2);
	       }
	    if(numHits == 12)
	       {
	           clearInterval(intervalId);
	           intervalId = startInterval(speed/2);
	       }
	    console.log(numHits);
	     ball.setAttribute('up-down', 'down');
	    break;
	    }
	   
	}
	
	// collision with paddle
	if(ball_pos.bottom >= paddle_pos.top)
	    	if(paddle_pos.left < ball_pos.right && ball_pos.left < (paddle_pos.left + paddle_pos.width))
		  ball.setAttribute('up-down', 'up');  
	
	else if(ball_pos.bottom >= base_top) {alert('game over');}
	
	

	if(ball_pos.y < 0)
    	    ball.setAttribute('up-down', 'down');
    
    	if(ball_pos.x < 0)
    	    ball.setAttribute('left-right', 'right');
	if(ball_pos.x > 400)
	    ball.setAttribute('left-right', 'left');
	
	// actual movement
	if(ball.getAttribute('up-down') == 'down')
	    ball.style.top = (ball_pos.y + 3)+ 'px';
	else ball.style.top = (ball_pos.y - 3)+ 'px';
	
	if(ball.getAttribute('left-right') == 'left')
	    ball.style.left = (ball_pos.x - 3)+ 'px';
	else ball.style.left = (ball_pos.x + 3)+ 'px';
	
}


// store in a function so we can call it again
function startInterval(_speed) {
  // Store the id of the interval so we can clear it later
  intervalId = setInterval(ballMovement, _speed);
}


function getInterval() {
  return speed;
}

var speed = 100;
var numHits = 0;
var intervalId;
var sensitivity = 10;
window.addEventListener('load', init);
window.addEventListener('keydown',movePaddle);
startInterval(speed);

*/