import {Sprite} from "../Observers/sprite";
export class Observable{
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