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
export { Observable };
