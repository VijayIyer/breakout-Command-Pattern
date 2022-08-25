import { Sprite, Context } from "./sprite";
export class ballObserver implements Sprite{
    content: HTMLElement;
    ballObserver(){
        this.content = document.createElement('div');
        this.content.setAttribute('id', 'ball');
        this.content.setAttribute('class', 'ball');
        this.content.setAttribute('left-right', 'left');
        
    }
    update(): void {
        let rect:any = this.content.getBoundingClientRect();
        if(this.content.getAttribute('left-right') === 'left') {
            this.content.style.left = (rect.x - 3) + 'px';
        }
        if(this.content.getAttribute('left-right') === 'right') {
            this.content.style.left = (rect.x + 3) + 'px';
        }

    }
    draw():void{

    }
};