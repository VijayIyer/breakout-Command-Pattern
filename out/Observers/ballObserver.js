var ballObserver = /** @class */ (function () {
    function ballObserver() {
    }
    ballObserver.prototype.ballObserver = function () {
        this.content = document.createElement('div');
        this.content.setAttribute('id', 'ball');
        this.content.setAttribute('class', 'ball');
        this.content.setAttribute('left-right', 'left');
    };
    ballObserver.prototype.update = function () {
        var rect = this.content.getBoundingClientRect();
        if (this.content.getAttribute('left-right') === 'left') {
            this.content.style.left = (rect.x - 3) + 'px';
        }
        if (this.content.getAttribute('left-right') === 'right') {
            this.content.style.left = (rect.x + 3) + 'px';
        }
    };
    ballObserver.prototype.draw = function () {
    };
    return ballObserver;
}());
export { ballObserver };
;
