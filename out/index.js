;
var Observable = /** @class */ (function () {
    function Observable() {
        this.sprites = [];
    }
    Observable.prototype.tick = function () {
        this.sprites.forEach(function (spr) { return spr.update(); });
    };
    Observable.prototype.attach = function (sprite) {
        this.sprites.push(sprite);
    };
    Observable.prototype.detach = function (sprite) {
        this.sprites.splice(this.sprites.indexOf(sprite), 1);
    };
    return Observable;
}());
var ballObserver = /** @class */ (function () {
    function ballObserver() {
        this.content = document.createElement('div');
        this.content.setAttribute('id', 'ball');
        this.content.setAttribute('class', 'ball');
        this.content.setAttribute('left-right', 'left');
        this.content.setAttribute('up-down', 'down');
    }
    ballObserver.prototype.update = function () {
        var rect = this.content.getBoundingClientRect();
        if (this.content.getAttribute('left-right') === 'left') {
            this.content.style.left = (rect.x - 3) + 'px';
        }
        if (this.content.getAttribute('left-right') === 'right') {
            this.content.style.left = (rect.x + 3) + 'px';
        }
        if (this.content.getAttribute('up-down') === 'up') {
            this.content.style.top = (rect.y - 3) + 'px';
        }
        if (this.content.getAttribute('up-down') === 'down') {
            this.content.style.top = (rect.y + 3) + 'px';
        }
    };
    ballObserver.prototype.draw = function () {
    };
    return ballObserver;
}());
;
var clockObserver = /** @class */ (function () {
    function clockObserver() {
        this.mins = "00";
        this.secs = "00";
        this.hours = "00";
        this.time = "0";
        this.content = document.createElement('div');
        this.content.classList.add('clock');
        this.content.innerHTML = "0";
    }
    clockObserver.prototype.update = function () {
        var time = parseInt(this.time);
        time += 1;
        this.time = time.toString();
        // this.secs = (parseInt(this.time)/10).toString();
        // this.mins = (parseInt(this.secs)/60).toString();
        this.content.innerHTML = this.time;
    };
    clockObserver.prototype.draw = function (context) {
    };
    return clockObserver;
}());
function pause(observable, sprite) {
    observable.detach(sprite);
}
function createPauseButton(name) {
    var button = document.createElement('button');
    button.innerHTML = name;
    button.setAttribute("id", "button");
    button.classList.add("button");
    document.getElementById("board").appendChild(button);
}
function init() {
    var numBricks = 0;
    var left = 20;
    var width = 20;
    var height = 10;
    var top = 0;
    createWall(20, numBricks, top, left, width, height, 'red');
    top += height + 5;
    numBricks += 20;
    createWall(20, numBricks, top, left, width, height, 'red');
    top += height + 5;
    numBricks += 20;
    createWall(20, numBricks, top, left, width, height, 'orange');
    top += height + 5;
    numBricks += 20;
    createWall(20, numBricks, top, left, width, height, 'orange');
    top += height + 5;
    numBricks += 20;
    createWall(20, numBricks, top, left, width, height, 'green');
    top += height + 5;
    numBricks += 20;
    createWall(20, numBricks, top, left, width, height, 'green');
    top += height + 5;
    numBricks += 20;
    createWall(20, numBricks, top, left, width, height, 'yellow');
    top += height + 5;
    numBricks += 20;
    createWall(20, numBricks, top, left, width, height, 'yellow');
    top += height + 5;
    numBricks += 20;
    createPaddle();
    createBase();
    createPauseButton("pause game");
}
function createPaddle() {
    var board = document.getElementById('board');
    var paddle = document.createElement('div');
    paddle.setAttribute("id", "paddle");
    paddle.classList.add("paddle");
    board.appendChild(paddle);
}
function createBox(brickNumber, top, left, width, height, color) {
    // console.log(top);
    var board = document.getElementById('board');
    var box = document.createElement('div');
    box.setAttribute('id', 'box' + brickNumber);
    box.classList.add("box");
    box.style.position = 'absolute';
    box.style.left = left + 'px';
    box.style.top = top + 'px';
    box.style.height = height + 'px';
    box.style.width = width + 'px';
    box.style.setProperty('background-color', color);
    board.appendChild(box);
}
function createWall(numBricks, numBricksBuilt, top, left, width, height, color) {
    var left_temp = left;
    for (var i = 0; i < numBricks; i++) {
        createBox(numBricksBuilt + i, top, left_temp, width, height, color);
        left_temp += width + 2;
    }
}
function createBase() {
    var board = document.getElementById('board');
    var base = document.createElement('div');
    base.setAttribute('id', 'base');
    base.classList.add('base');
    board.appendChild(base);
}
window.addEventListener('load', init);
var observable = new Observable();
var ball = new ballObserver();
document.getElementById('board').appendChild(ball.content);
observable.attach(ball);
var clock = new clockObserver();
document.getElementById('board').appendChild(clock.content);
observable.attach(clock);
// document.getElementById("button").addEventListener('click', 
// (evt : CustomEvent)=>
// {
//     console.log("pause game");
// }, false);
setInterval(function () {
    observable.tick();
}, 100);
